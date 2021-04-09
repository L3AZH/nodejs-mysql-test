const { SuccessResponse } = require("../models/successResponse");
const { ErrorResponse } = require("../models/errorResponse");
const User = require("../database/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncMiddleware = require("../middleware/asyncMiddleware");

exports.login = asyncMiddleware(async (req, res, next) => {
  //   if (!req.body.email || !req.body.password) {
  //     return res.status(400).json(
  //       new ErrorResponse(400, {
  //         message: "Please fill in all the required fields.",
  //         field: ["email", "password"],
  //       })
  //     );
  //   }
  const dataResult = await User.findOne({
    where: { email: req.body.email },
  });

  if (dataResult == null) {
    return res.status(400).json(
      new ErrorResponse(400, {
        message: "Invalid Email or Password",
      })
    );
  } else {
    const validPassword = await bcrypt.compare(
      req.body.password,
      dataResult.password
    );
    if (!validPassword)
      return res.status(400).json(
        new ErrorResponse(400, {
          message: "Invalid Email or Password",
        })
      );
    const token = dataResult.generationKey();

    return res
      .header("x-auth-token", token)
      .status(200)
      .json(
        new SuccessResponse(200, {
          message: `Loggined with email : ${dataResult.email}`,
          yourToken: token,
        })
      );
  }
});
