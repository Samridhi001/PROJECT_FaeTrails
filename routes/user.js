const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users.js");

//render signup
router.get("/signup", userController.renderSignupForm);

//signup
router.post(
  "/signup",
  wrapAsync(userController.signup)
);

//render login
router.get("/login", userController.renderLoginForm);

//login
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
 userController.login
);

//logout
router.get("/logout",userController.logout);

module.exports = router;
