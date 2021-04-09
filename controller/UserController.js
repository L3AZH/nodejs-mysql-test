const User = require("../database/models/User");
const { SuccessResponse } = require("../models/successResponse");
const { ErrorResponse } = require("../models/errorResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

exports.getCurrentUser = async (req, res, next) => {
  const currentUser = await User.findByPk(req.user._id);
  return res.status(200).json(
    new SuccessResponse(200, {
      result: currentUser,
    })
  );
};

exports.register = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json(
      new ErrorResponse(400, {
        message: "Please fill in all the required fields.",
        field: ["username", "email", "password"],
      })
    );
  }
  try {
    const hashPass = await hashPassword(req.body.password);
    //console.log(await hashPassword(req.body.password))
    const dataResult = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
    });
    const token = dataResult.generationKey();
    return res
      .header("x-auth-token", token)
      .status(200)
      .json(
        new SuccessResponse(200, {
          message: "Register Successfully !!",
          result: dataResult,
        })
      );
  } catch (err) {
    next(err);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const dataResult = await User.findAll();
    if (dataResult.length === 0) {
      return res.status(404).json(
        new ErrorResponse(404, {
          message: "Table data User is empty !!",
        })
      );
    }
    return res.status(200).json(
      new SuccessResponse(200, {
        result: dataResult,
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const dataResult = await User.findByPk(id);
    return res.status(200).json(
      new SuccessResponse(200, {
        result: dataResult,
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.updateUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const dataResult = await User.update(req.body, {
      where: { id: id },
    });
    if (dataResult == 1) {
      return res.status(200).json(
        new SuccessResponse(200, {
          message: "Update user successfully",
        })
      );
    } else {
      return res.status(404).json(new ErrorResponse(404), {
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const dataResult = await User.destroy({
      where: { id: id },
    });
    if (dataResult == 1) {
      return res.status(200).json(
        new SuccessResponse(200, {
          message: "Deleted user successfully",
        })
      );
    } else {
      return res.status(404).json(new ErrorResponse(404), {
        message: `Cannot delete User with id=${id}. Maybe User was not found!`,
      });
    }
  } catch (err) {
    next(err);
  }
};
