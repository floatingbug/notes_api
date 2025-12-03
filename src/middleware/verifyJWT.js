const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
    const authorization = req.headers.authorization;

    // no token provided
    if (!authorization) {
        return res.status(401).json({
            success: false,
            code: 401,
            errors: ["No authorization token provided."],
        });
    }

    // expected: "Bearer <token>"
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({
            success: false,
            code: 401,
            errors: ["Invalid authorization header format."],
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach decoded payload to request
        req.user = decoded;

        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            code: 401,
            errors: ["Invalid or expired token."],
        });
    }
}

module.exports = verifyJWT;
