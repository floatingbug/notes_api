const response = require("@utils/response");
const usersService = require("@services/users");
const { ObjectId } = require("mongodb");

async function getUserById(req, res, next) {
    const errors = validateParams(req.params);

    if (errors.length > 0) 
        return response(res, {
            success: false,
            code: 400,
            errors,
        });

    try {
        const result = await usersService.getUserById({userId: req.params.id});
        response(res, result);
    }
    catch (error) {
        next(error);
    }
}

function validateParams(params) {
    const errors = [];

    if (!params.id) {
        errors.push("User ID is required.");
    } 
    else if (!ObjectId.isValid(params.id)) {
        errors.push("Invalid User ID.");
    }

    return errors;
}

module.exports = getUserById;
