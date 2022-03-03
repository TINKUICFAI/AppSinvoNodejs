const express = require("express");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const utils = require("../../utils/utils.js");
const jwt = require("../../utils/jwt.js");
const User = require("../../models/user.js");
const { createJsonResponse } = require("../../utils/serverResponse.js");

const authRouter = express.Router();

/**
 * @route POST "/api/auth/login"
 */
authRouter.post(
    "/login",
    [
        body("email")
            .exists()
            .withMessage("email must be exist")
            .bail()
            .isEmail()
            .withMessage("email should be a valid type")
            .bail(),
        body("password")
            .exists()
            .withMessage("password must be exist")
            .bail()
            .notEmpty()
            .withMessage("password should not be empty")
            .bail(),
    ],
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(createJsonResponse(400, "Invalid json body", errors.array()));
        }

        const { email, password } = req.body;

        // check for user
        const [employeerows] = await User.getUserByEmail(email);

        if (employeerows.length === 0) {
            return res.status(400).json(createJsonResponse(400, "Invalid user"));
        }

        if (!utils.compareHashPassword(password, employeerows[0].password)) {
            return res.status(400).json(createJsonResponse(400, "Invalid user"));
        }

        const token = jwt.generateJWT({ id: employeerows[0].id });

        delete employeerows[0].password;
        return res.json(createJsonResponse(200, "Successfull", { ...employeerows[0], token }));
    })
);

/**
 * @route POST "/api/User/insert"
 */
authRouter.post(
    "/insert",
    [
        body("email")
            .exists()
            .withMessage("email must be exist")
            .bail()
            .notEmpty()
            .withMessage("email should not be empty")
            .bail()
            .isEmail()
            .withMessage("email should be a valid type")
            .bail(),
        body("password")
            .exists()
            .withMessage("password must be exist")
            .bail()
            .notEmpty()
            .withMessage("password should not be empty")
            .bail(),
    ],
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(createJsonResponse(400, "Invalid json body", errors.array()));
        }

        const { email, password } = req.body;

        const [UserRow] = await User.getUserByEmail(email);

        if (UserRow.length > 0) {
            return res.status(400).json(createJsonResponse(400, "Already exists"));
        }

        const empl = await User.insertUser({ ...req.body, password: utils.encryptPassword(password) });

        const result = await User.getUserById(empl[0].insertId);

        delete req.body.password;

        const token = jwt.generateJWT({ id: empl[0].insertId });

        return res.json(createJsonResponse(200, "Successfull", {...result[0][0],token}));
    })
);

module.exports = authRouter;
