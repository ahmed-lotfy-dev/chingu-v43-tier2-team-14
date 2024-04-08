import express from "express"
import passport from "passport"
import { APP_HOME } from "../utils/secrets.js"

const router = express.Router()

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      sessionStorage: req.user,
      cookies: req.cookies,
    })
  }
})

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  })
})

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout route to logout the user
 *     description: hit this route if needed to log out the user
 */
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect(APP_HOME)
    console.log("from logout", APP_HOME)
  })
})

/**
 * @swagger
 * /google:
 *   get:
 *     summary: Google oauth login route
 *     description: login with google oauth route using passport js
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

/**
 * @swagger
 * /google/callback:
 *   get:
 *     summary: Google oauth login callback route to handle if the state and code is right and user grant permission then redirect , sign him in the app
 *     description: hit this route if needed to log out the user
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: APP_HOME,

    failureRedirect: "/login/failed",
  }),
  (req, res, next) => {
    console.log("from logout", APP_HOME)
  }
)

export default router
