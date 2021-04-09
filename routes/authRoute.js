const authValidation = require("../validation/authValidator")
const authController = require("../controller/AuthController")
const router = require("express").Router()

router.post(
    "/",
    authValidation.userLoginValidation,
    authValidation.result,
    authController.login
)

module.exports = router