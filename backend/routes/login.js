const {Router} = require('express');
const {OAuth2Client} = require('google-auth-library');
const secrets = require('../../secrets.json');
const GOOGLE_ID = secrets.googleId;
const googleIdentity = new OAuth2Client(GOOGLE_ID);
const router = Router();

router.post('/login', async (req, res) => {
    const loginToken = await googleIdentity.verifyIdToken({ idToken: req.body.credential, audience: GOOGLE_ID });
    const payload = loginToken.getPayload();
    const userEmail = payload.email;
    res.cookie('eshopLogin', userEmail);
    res.sendStatus(200)

});

module.exports = router;