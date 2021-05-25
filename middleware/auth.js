require("dotenv").config()

const { cache } = require('../utils/cache');

const MALL_ID = process.env.MALL_ID

//the auth middleware 
exports.auth = (req, res, next) => {
    const token = cache.get( MALL_ID );
    req.token = token;
    next();
}