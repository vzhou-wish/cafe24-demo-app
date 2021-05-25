const { Router }= require('express');
const {auth, authCallback} = require("../controllers/authController")
const router = new Router();

router.get('/', auth);

router.get('/callback', authCallback);

module.exports = router;
