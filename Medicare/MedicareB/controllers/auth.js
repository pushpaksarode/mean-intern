const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");


// sign up 
exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          err: "NOT able to save user in DB"
        });
      }
      res.json({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        id: user._id
      });
    });
};


// sign in
exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "Invalid Email"
        });
      }
      if (!user.autheticate(password)) {
        return res.status(401).json({
          error: "Invalid Email and Password"
        });
      } 
      const { _id,firstname,lastname, email } = user;
      return res.json({  user: { _id, firstname, lastname, email } });
    });
};