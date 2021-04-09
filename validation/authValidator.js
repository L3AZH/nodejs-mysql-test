const { body, validationResult } = require("express-validator");
const { ErrorResponse } = require("../models/errorResponse");

module.exports = {
  userLoginValidation: [
    body("email", "Invalid email address").trim().isEmail().notEmpty(),
    body("password", "Invalid password address").optional().trim().notEmpty(),
  ],
  result: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ErrorResponse(400, { errors: errors.array() }));
    }
  },
};
