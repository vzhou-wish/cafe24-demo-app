require("dotenv").config()

const { cache } = require('../utils/cache');

const MALL_ID = process.env.MALL_ID

//the auth middleware 
exports.auth = (req, res, next) => {
    const token = cache.get( MALL_ID );
    console.log("keys: ", global.nodeCache.keys())
    req.token = token;
    next();
}