const { expressjwt } = require("express-jwt");

// Authorization using the token
exports.authenticateToken = expressjwt({
    secret: toString(process.env.JWT_SECRET),
    algorithms: ["HS256"],
});
