const express = require("express");
const router = express.Router();
const User = require("../models/user");

//Using Controllers
const { signup, login, logout } = require("../controllers/authentication");
const { check } = require("express-validator");

//Authentication Routes
router.post(
  "/signup",
  [
    check("name")
      .not()
      .isEmpty()
      .withMessage("Name is Required")
      .isLength({
        min: 3,
      })
      .withMessage("Name should be atleast 3 Characters")
      .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          User.findOne({ name: req.body.name }, function (err, user) {
            if (err) {
              reject(new Error("Server Error"));
            }
            if (Boolean(user)) {
              reject(new Error("Username is already taken"));
            }
            resolve(true);
          });
        });
      }),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Enter valid Email Address")
      .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
              reject(new Error("Server Error"));
            }
            if (Boolean(user)) {
              reject(new Error("E-mail already in use"));
            }
            resolve(true);
          });
        });
      }),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is Required")
      .isLength({
        min: 5,
      })
      .withMessage("Password should be atleast 5 Characters "),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email", "Email is Required").isEmail(),
    check("password", "Password is Required ").isLength({
      min: 1,
    }),
  ],
  login
);

router.get("/logout", logout);

module.exports = router;
