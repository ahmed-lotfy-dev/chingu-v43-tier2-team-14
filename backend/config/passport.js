import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import User from "../models/userModel.js";
import { GOOGLE_ID, GOOGLE_SECRET } from "../utils/secrets.js"
const GoogleStrategy = passportGoogle.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleId = profile.id;
      const email = profile.emails[0].value
      const name = profile.displayName
      const picture = profile.photos[0].value
      const provider = "google";

      const currentUser = await User.findOne({ googleId: googleId })
      console.log(currentUser)
      if (currentUser) {
        return done(null, currentUser);
      } else {
        const newUser = await User.create({
          googleId: googleId,
          email: email,
          name: name,
          picture: picture,
          provider: provider
        })
        return done(null, newUser);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (id, done) {
  const user = await User.findById(id).populate('books')
  done(null, user);
})