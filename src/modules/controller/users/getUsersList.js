const response = require("@utils/response");
const validator = require("validator");
const usersService = require("@services/users");

async function getUsersList(req, res, next){
    const errors = validate(req.body);

    if(errors.length > 0) return response(res, {
        success: false,
        code: 400,
        errors,
    });

    try{
        const result = await usersService.getUsersList({});
        response(res, result);
    }
    catch(error){
        next(error);
    }
}

function validate(payload){
    const errors = [];
    return errors;
}

module.exports = getUsersList;
