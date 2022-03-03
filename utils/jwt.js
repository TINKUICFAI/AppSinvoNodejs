const jsonwebtoken = require("jsonwebtoken");
const config = require("../config/config.json");

exports.generateJWT = (payload) => {
    const token = jsonwebtoken.sign(payload, config.jwt.publicKey, { expiresIn: config.jwt.expiresIn });
    return token;
};


exports.verifyJWT = (token) => {
    const payload = jsonwebtoken.verify(token, config.jwt.publicKey);
    return payload;
};
