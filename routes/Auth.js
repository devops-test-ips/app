const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/logout', (req, resp) => {
    req.logout();
    resp.redirect('/')
});
router.get('/google/callback', passport.authenticate('google'), (req, resp) => {
    resp.redirect('profile');
});

module.exports = router;