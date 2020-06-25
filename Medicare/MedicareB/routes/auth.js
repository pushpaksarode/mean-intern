var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signup,signin } = require("../controllers/auth");


// sing up
router.post(
  "/signup",
  [
    check("firstname", "first name should be at least 1 char").isLength({ min: 1 }),
    check("lastname", "last name should be at least 1 char").isLength({ min: 1 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);


// sign in
router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ],
  signin
);


// sign out
//router.get("/signout", signout);

module.exports = router;