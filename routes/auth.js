const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

// @route   GET /auth/github
// @desc    Redirect to GitHub for authentication
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// @route   GET /auth/github/callback
// @desc    GitHub callback URL
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/api-docs');
  }
);

// @route   GET /auth/logout
// @desc    Logout user
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.redirect('/api-docs');
  });
});

// @route   GET /auth/status
// @desc    Check authentication status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        username: req.user.username,
        displayName: req.user.displayName,
        profileUrl: req.user.profileUrl,
      },
    });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
