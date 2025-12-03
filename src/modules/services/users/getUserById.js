const usersModel = require("@models/users");
const {ObjectId} = require("@config/db");


async function getUserById({userId}) {
    try {
		const filter = {
			_id: new ObjectId(userId),
		};

        const user = await usersModel.getUserById({filter});

        if (!user) {
            return {
                success: false,
                code: 404,
                errors: ["User not found."],
            };
        }

        // Remove password before returning
        const {password, ...cleanUser} = user;

        return {
            success: true,
            code: 200,
            data: cleanUser,
        };
    }
    catch (error) {
        throw error;
    }
}

module.exports = getUserById;
