const {Router} = require('express');
const router = Router();

router.get('/logout', async (req, res) => {
    res.clearCookie('eshopLogin');
    res.sendStatus(200);
});

module.exports = router;