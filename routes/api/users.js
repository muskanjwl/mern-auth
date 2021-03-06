const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const checkauth = require("../../check-auth");
const methodOverride= require("method-override");

// Load input validation
const validateSignupInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

router.get('/home',/*checkauth,*/ function(req,res){
  res.render("pages/home")
});
router.get("/signup",function(req,res){
  res.render("pages/signup")
});
router.get("/login",function(req,res){
  res.render("pages/login")
});
router.delete("/logout",function(req,res){
  console.log("in logout");
  req.logOut();
  res.redirect("login");
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/signup", (req, res) => {
    // Form validation
  const { errors, isValid } = validateSignupInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
          const newUser = new User({
            firstname: req.body.firstname,
            middlename:req.body.middlename,
            lastname:req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            mobile:req.body.mobile,
            dob:req.body.dob,
            education:req.body.education,
            address:req.body.address,
            pincode:req.body.pincode,
            city:req.body.city,
            state:req.body.state,
            country:req.body.country,
            // attachment:req.body.attachment,
          });
          res.redirect('login');
        
  // Hash password before saving in data base
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            try{
              newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
            }
            catch(err){
              console.log(err);
            }
           
          });
        });
      }
    });
  });

  // @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              req.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
          res.redirect('home');
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  module.exports = router;