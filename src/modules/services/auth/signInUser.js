const authModel = require("@models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function signInUser({ nameOrEmail, password }) {
    let user = null;
	let token = null;

    try {
        // find user by name OR email
        user = await findUser({nameOrEmail});

        if (!user) {
            return {
                success: false,
                code: 401,
                errors: ["Invalid credentials."],
            };
        }

        // check password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return {
                success: false,
                code: 401,
                errors: ["Invalid credentials."],
            };
        }

        // prepare cleaned user object
        const { password: removedPassword, ...cleanUser } = user;

		token = await createJWT({user: cleanUser});

        return {
            success: true,
            code: 200,
            message: "User signed in successfully.",
            data: {
				user: cleanUser,
				token,
			}
        };
    }
    catch (error) {
        throw error;
    }
}

async function findUser({nameOrEmail}) {
    try {
        const filter = {
            $or: [
                { name: nameOrEmail },
                { email: nameOrEmail },
            ],
        };

        const user = await authModel.getUser({ filter });

        return user;
    }
    catch (error) {
        throw error;
    }
}

async function createJWT({user}){
	return new Promise((resolv, reject) => {
		jwt.sign(
			user, 
			process.env.JWT_SECRET, 
			{ expiresIn: "1h" },
			(error, token) => {
				if(error) reject(error);
				else resolv(token);
			}
		);
	});
}


module.exports = signInUser;
