const response = require("@utils/response");

async function getUser(req, res, next) {
    try {
        // req.user contains the authenticated user (set by the auth middleware)
        const { password, ...cleanUser } = req.user;

        return response(res, {
            success: true,
            code: 200,
            data: cleanUser,
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = getUser;
