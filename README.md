# 🧩 **System design


# 1 Requirements

### 1.1 Business 

- Users must be able to register and log in.
- Users can only see and manage their own notes.
- Notes should have a title and content.
- Users can organize notes (optional: tags, folders, etc.).
- Users should be able to edit or delete their notes.
- The system must provide meaningful error messages to users for invalid actions.

### 1.2 Functional

- **Authentication:** JWT-based login and signup with hashed passwords.    
- **Notes CRUD:** Create, read, update, delete notes.
- **Authorization:** Users can only access their own notes.
- **Validation:** Input validation for note content, title, and user credentials.
- **Endpoints:** `/auth/signup`, `/auth/signin`, `/notes`, `/notes/:id`.

### 1.3 Non-Functional

- **Performance:** API responses under 200ms for normal load.    
- **Security:** Passwords hashed with bcrypt; JWT tokens with expiration.
- **Scalability:** Support multiple users and large numbers of notes.
- **Maintainability:** Code follows Controller → Service → Model pattern.
- **Logging & Monitoring:** Errors and critical operations are logged.
- **Deployment:** Runs on Linux; environment variables for configuration.

---

# **2. Domain Analysis**

- Domain objects / entities: User, Note, Tag.
- Relationships and cardinalities: User 1:n Notes, Note n:m Tags.
- Domain rules, constraints, and policies: Notes must have a title and content, Tags must be unique per Note, User email must be unique.
- Dependencies between entities: Note depends on User, Note may reference Tags.

---

# **3. Data Modeling**

- Entities, attributes, primary and foreign keys: 
  - User: _id, name, email, password, createdAt, updatedAt
  - Note: _id, title, content, ownerId, createdAt, updatedAt
  - Tag: _id, name, noteId
- Relationships: User 1:n Notes, Note n:m Tags
- Indexing and performance optimizations: index on ownerId in Notes, index on noteId in Tags, full-text search on Note content
- Consistency rules, constraints, validations: required fields, max lengths, unique email for User, unique tag names per Note

---

# **4. API Design / Interface Specification**

- Endpoints, resources, and HTTP methods:
  - POST /auth/signup
  - POST /auth/signin
  - GET /users/me
  - GET /notes
  - POST /notes
  - GET /notes/:id
  - PUT /notes/:id
  - DELETE /notes/:id
- Request and response formats: JSON body for POST/PUT, query parameters for filtering, headers for auth
- Error codes and standard responses: 400 validation errors, 401 unauthorized, 403 forbidden, 404 not found, 500 internal server error
- Authentication and role rules: JWT authentication, user can only access their own notes
- Versioning strategy: /api/v1/...

Link to the api documentation: https://documenter.getpostman.com/view/42238271/2sB3dMyrUx#intro

---

# 5. Architecture

# 5.1 Controller Layer

The controller handles incoming HTTP requests and prepares HTTP responses.  
It **does not contain business logic** and **does not access the database directly**.

### Responsibilities
- Validate request data
- Extract data from `req.body`, `req.params`, `req.query`, etc.
- Call the corresponding service method
- Return service results to the client

### Must *not* do
- Build filters for queries
- Create documents for MongoDB
- Perform business logic
- Call the database directly

# 5.2 Service Layer

The service layer contains the application’s business logic.  
It is the only place where MongoDB filters, update objects, and documents are created.

### Responsibilities
- Build MongoDB filters (e.g., user lookup conditions)
- Build document objects for inserts or updates
- Execute business logic (e.g., hashing passwords, validating credentials)
- Prepare the data flow between controller and model
- Call model functions with fully prepared arguments

### Example Duties
```js
const filter = {
    $or: [
        { name },
        { email },
    ],
};

const doc = {
    name,
    email,
    password: hashedPassword,
    createdAt: Date.now(),
    updatedAt: Date.now(),
};
```


# 5.3 Model Layer

The model layer performs **pure database operations** using the MongoDB native driver.  
It is intentionally simple and contains no business logic.

### Responsibilities
- Execute `findOne`, `insertOne`, `updateOne`, `deleteOne`, etc.
- Receive fully prepared `{ filter }`, `{ doc }`, `{ filter, update }` objects
- Return raw database results to the service layer

### Must *not* do
- Build filters
- Create documents
- Execute business logic
- Access HTTP request data

### Example Model Function
```js
async function getUser({ filter }) {
    return await db.collection("users").findOne(filter);
}
```


---

# **6. UX/UI Pre-Planning**

- User flows / scenarios: signup, signin, create note, edit note, delete note, view notes, search/filter notes
- Wireframes or mockups: login page, notes list, note editor, settings
- Layout system and design guidelines: color palette, typography, reusable UI components
- Mobile and desktop design: responsive layouts, touch-friendly UI, keyboard shortcuts for desktop
