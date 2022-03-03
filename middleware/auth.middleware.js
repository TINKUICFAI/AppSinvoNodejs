const jwt = require("../utils/jwt.js");
const { createJsonResponse } = require("../utils/serverResponse.js");

module.exports = (req, res, next) => {
    // check token if available
    const token = req.headers.authorization && req.headers.authorization !== "";

    if (!token) {
        return res.status(400).json(createJsonResponse(400, "No authorization token"));
    }

    // check payload
    try {
        const payload = jwt.verifyJWT(req.headers.authorization.split(" ")[1]);
        req.payload = payload;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(400).json(createJsonResponse(400, "Authorization token expire"));
        }

        return res.status(400).json(createJsonResponse(400, "No authorization token"));
    }
};
