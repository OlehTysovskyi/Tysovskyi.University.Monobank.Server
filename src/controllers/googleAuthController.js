const passport = require("passport");
const User = require("../models/user");
const { clientID, clientSecret } = require("../../config/config");

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  "google-auth",
  new GoogleStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: "http://localhost:3001/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ where: { email: profile.email } });

        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email: profile.email,
          });
        }

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (user_id, done) => {
  const currentUser = await User.findOne({ where: { id: user_id } });
  done(null, currentUser);
});
