const authModel = require("@models/auth");
const bcrypt = require("bcrypt");

async function signUpUser({ name, email, password }) {
    let user = null;

    try {
        // check if user already exists
        const existingUser = await getUser({ name, email });

        if (existingUser) {
            return {
                success: false,
                code: 409,
                errors: ["Name or Email already exists."],
            };
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // add user to DB
        user = await addUserToDb({
            name,
            email,
            password: hashedPassword,
        });
    }
    catch (error) {
        throw error;
    }

    return {
        success: true,
        code: 201,
        message: "User has been signed up.",
        data: user,
    };
}

async function getUser({ name, email }) {
    try {
        const filter = {
            $or: [{ name }, { email }],
        };

        const result = await authModel.getUser({ filter });

        return result;
    }
    catch (error) {
        throw error;
    }
}

async function addUserToDb({ name, email, password }) {
    try {
        const doc = {
            name,
            email,
            password,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        const result = await authModel.addUser({ doc });

        // remove password from returned data
        const {password: _removed, ...cleanUser } = doc;

        return cleanUser;
    }
    catch (error) {
        throw error;
    }
}

module.exports = signUpUser;
