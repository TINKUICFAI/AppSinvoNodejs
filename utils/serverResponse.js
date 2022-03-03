exports.createJsonResponse = (code = 200, msg = "", data = {}) => {
    if (Array.isArray(data)) {
        return { statusCode: code, message: msg, data, count: data.length };
    }
    return { statusCode: code, message: msg, data };
};
