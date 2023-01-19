const {Router} = require('express');
const router = Router();

router.get('/logout', async (req, res) => {
    console.log('Thanks for using our site' + req.user.username);
    res.clearCookie('eshopLogin');
    res.end();
});

module.exports = router;