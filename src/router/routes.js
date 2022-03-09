const express = require("express");

const authRouter = require("../controlers/Auth/auth.js");
const userRouter = require("../controlers/Employee/User.js");
// const clientRouter = require("./Client/client.js");

const router = express.Router();

const userAuth = require('../../middleware/auth.middleware.js')



router.use("/api/auth", authRouter);

router.use(userAuth);

// router.use("/api/admin", adminRouter);
router.use("/api/user", userRouter);

module.exports = router;
