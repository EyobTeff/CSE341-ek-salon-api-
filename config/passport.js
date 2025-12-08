const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Only initialize GitHub strategy if credentials are provided
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL || 'http://localhost:8080/auth/github/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        // User authenticated successfully
        return done(null, profile);
      }
    )
  );
} else {
  console.warn('GitHub OAuth credentials not configured. Authentication will not work.');
}

module.exports = passport;
