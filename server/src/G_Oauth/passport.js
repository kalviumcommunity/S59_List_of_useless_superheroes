require('dotenv').config();
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
// LOCALHOST OR RENDER
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: "https://serverk.onrender.com/auth/google/callback",
    callbackURL: "http://localhost:5000/auth/google/callback",
    scope: ['email', 'profile'] 
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
));


passport.serializeUser(function(user, done) {
    done(null, user);
  }
);

passport.deserializeUser(function(user, done) {
    done(null, user);
  }
);