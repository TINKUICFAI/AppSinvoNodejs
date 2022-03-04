const express = require("express");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../../models/User.js");
const utils = require("../../utils/utils.js");
const { createJsonResponse } = require("../../utils/serverResponse.js");

const UserRouter = express.Router();

/**
 * @route GET "/api/User/"
 */
UserRouter.get(
    "/",
    asyncHandler(async (req, res) => {
        // Get all Users
        const [allUserRows] = await User.getAllUsers();

        return res.json(createJsonResponse(200, "Successfull", allUserRows));
    })
);

/**
 * @route GET "/api/User/:id"
 */
UserRouter.get(
    "/:id",
    asyncHandler(async (req, res) => {
        // Get User by id
        const [UserRow] = await User.getUserById(req.params.id);

        return res.json(createJsonResponse(200, "Successfull", UserRow));
    })
);

/**
 * @route PUT "/api/User/update"
 */
UserRouter.put(
    "/update",
    asyncHandler(async (req, res) => {
        const UserReqData = req.body;

        const [rows] = await User.updateUserById(UserReqData);

        return res.json(createJsonResponse(200, "Successfull", rows));
    })
);


/**
 * @route PUT "/api/User/verify"
 */
 UserRouter.put(
    "/status",
    asyncHandler(async (req, res) => {
        const UserReqData = req.body;

        const [rows] = await User.updateUserSatus(UserReqData);

        return res.json(createJsonResponse(200, "Successfull", rows));
    })
);

/**
 * @route PUT "/api/User/updatePassword"
 */
 UserRouter.put(
    "/updatePassword",[
         body("password")
                .exists()
                .withMessage("password must be exist")
                .bail()
                .notEmpty()
                .withMessage("password should not be empty")
                .bail(),],

   
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(createJsonResponse(400, "Invalid json body", errors.array()));
        }

        const { password } = req.body;

        await User.updateUserPassword({ ...req.body, password: utils.encryptPassword(password) });
        // console.log("bodyjdsfjjd",req.body);
        return res.json(createJsonResponse(200, "Successfull", req.body));
       
    })
);

/**
 * @route DELETE "/api/User/:id"
 */
UserRouter.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        const UserId = req.params.id;

        const [rows] = await User.deleteUserById(UserId);

        return res.json(createJsonResponse(200, "Successfull", rows));
    })
);


/**
 * @route Post "/api/User/distance"
 */
 UserRouter.post(
    "/distance/:id",
    asyncHandler(async (req, res) => {
        
        // Get User Distance
        const result = await User.getDistance(req.body,req.params.id);  
        const distance=result[0][0][0].distance+" Km";
        delete result[0][0][0].id

        return res.json(createJsonResponse(200, "Successfull", {...result[0][0][0],distance}));
    })
);

module.exports = UserRouter;
