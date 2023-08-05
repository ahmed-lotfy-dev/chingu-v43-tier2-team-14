import express from "express"
import passport from "passport";
import { APP_HOME } from "../utils/secrets.js";

const router = express.Router()

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      sessionStorage: req.user,
      cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect(APP_HOME);
    console.log('from logout', APP_HOME)
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: APP_HOME,

    failureRedirect: "/login/failed",
  }), (req, res, next) => {
    console.log('from logout', APP_HOME)

  }
);


export default router

