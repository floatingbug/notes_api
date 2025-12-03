const response = require("@utils/response");
const validator = require("validator");
const authService = require("@services/auth");


async function signInUser(req, res, next){
    const errors = validate(req.body);

    if (errors.length > 0) {
        return response(res, {
            success: false,
            code: 400,
            errors,
        });
    }

    try {
        const result = await authService.signInUser({
            nameOrEmail: req.body.nameOrEmail,
            password: req.body.password,
        });

        response(res, result);
    }
    catch (error) {
        next(error);
    }
}


function validate(payload){
    const errors = [];

    // Required fields
    if (!payload.nameOrEmail) {
        errors.push("Field 'nameOrEmail' is required.");
    }
    if (!payload.password) {
        errors.push("Field 'password' is required.");
    }

    // Stop early if required fields are missing
    if (errors.length > 0) {
        return errors;
    }

    // Type checks
    if (typeof payload.nameOrEmail !== "string") {
        errors.push("Field 'nameOrEmail' must be a string.");
    }
    else {
        if (payload.nameOrEmail.length < 3) {
            errors.push("Field 'nameOrEmail' must have at least 3 characters.");
        }
        else if (payload.nameOrEmail.length > 100) {
            errors.push("Field 'nameOrEmail' cannot exceed 100 characters.");
        }
    }

    if (typeof payload.password !== "string") {
        errors.push("Field 'password' must be a string.");
    }
    else {
        if (payload.password.length < 8) {
            errors.push("Field 'password' must have at least 8 characters.");
        }
        else if (payload.password.length > 128) {
            errors.push("Field 'password' cannot exceed 128 characters.");
        }
    }

    // No additional properties allowed
    const allowedKeys = ["nameOrEmail", "password"];
    const extraKeys = Object.keys(payload).filter(key => !allowedKeys.includes(key));

    if (extraKeys.length > 0) {
        errors.push("Payload contains unsupported properties: " + extraKeys.join(", "));
    }

    return errors;
}


module.exports = signInUser;
