require("dotenv").config()

const { cache } = require('../utils/cache');

//the auth middleware 
exports.auth = (req, res, next) => {
    const { mall_id } = req.params;
    if (!mall_id){
        let err = new Error("mall_id is missing!");
        err.status = 400;
        next(err);
    }
    const token = cache.get( mall_id );
    req.token = token;
    next();
}