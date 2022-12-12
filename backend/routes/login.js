const {Router} = require('express');

const router = Router();

router.post('/login', async (req, res) => {
    res.cookie('eshopLogin', req.body.credential);
    console.log(req.cookies);
    res.sendStatus(200)

});

module.exports = router;