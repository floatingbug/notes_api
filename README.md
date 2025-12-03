## Layer Responsibilities (Controller → Service → Model)

The backend architecture follows a clear separation of concerns across three layers. This ensures maintainability, testability, and a predictable data flow.

---

## 1. Controller Layer

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

---

## 2. Service Layer (Builds Filters & Documents)

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
