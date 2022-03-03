const { createJsonResponse } = require("../utils/serverResponse.js");

module.exports = (error, _req, res, _next) => {
    // Need better error handler
    console.log(error);
    res.status(500).json(createJsonResponse(500, error.message));
};
