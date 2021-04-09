const router = require("express").Router()
const userController = require("../controller/UserController")
const userValidation = require("../validation/userValidator")
const authMiddleware = require("../middleware/auth")
const { route } = require("./authRoute")

router.post(
    "/insert",
    userValidation.userInsertValidation,
    userValidation.result,
    userController.register
)

router.get(
    "/get-all",
    userController.getAllUser
)

router.get(
    "/get-one/:id",
    userValidation.userID,
    userValidation.result,
    userController.getUserById
)

router.get(
    "/me",
    authMiddleware,
    userController.getCurrentUser
)

router.put(
    "/update/:id",
    [userValidation.userID,userValidation.userInsertValidation],
    userValidation.result,
    userController.updateUserById
)

router.delete(
    "/delete/:id",
    userValidation.userID,
    userValidation.result,
    userController.deleteUserById
)

module.exports = router