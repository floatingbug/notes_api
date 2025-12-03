const response = require("@utils/response");
const validator = require("validator");
const authService = require("@services/auth");


async function signUpUser(req, res, next){
    const errors = validate(req.body);

    if (errors.length > 0) {
        return response(res, {
            success: false,
            code: 400,
            errors,
        });
    }

	try {
		const result = await authService.signUpUser({
			name: req.body.name,
			email: req.body.email,
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

    // name
    if(!payload.name || typeof payload.name !== "string"){
        errors.push("Name is required and must be a string.");
    }
    else
    if(payload.name.trim().length < 3){
        errors.push("Name must be at least 3 characters long.");
    }

    // email
    if(!payload.email || typeof payload.email !== "string"){
        errors.push("Email is required and must be a string.");
    }
    else
    if(!validator.isEmail(payload.email)){
        errors.push("Email must be a valid email address.");
    }

    // password
    if(!payload.password || typeof payload.password !== "string"){
        errors.push("Password is required and must be a string.");
    }
    else
    if(payload.password.length < 8){
        errors.push("Password must be at least 8 characters long.");
    }
    else
    if(!/[A-Z]/.test(payload.password)){
        errors.push("Password must contain at least one uppercase letter.");
    }
    else
    if(!/[a-z]/.test(payload.password)){
        errors.push("Password must contain at least one lowercase letter.");
    }
    else
    if(!/[0-9]/.test(payload.password)){
        errors.push("Password must contain at least one number.");
    }
    // special characters ARE allowed but NOT required → so no validation for them

    return errors;
}


module.exports = signUpUser;
