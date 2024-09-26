const express = require("express");
const {registerController, loginController,validateToken,logOutController}= require('../control/userController')
const router = express.Router();



//Create User
router.post("/register", registerController)
router.post("/varifytoken",validateToken)
router.post("/login", loginController)

module.exports = router