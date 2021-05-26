const axios = require("axios")
require("dotenv").config()
const CLIENT_ID = process.env.CLIENT_ID

exports.fontController = async (req, res, next) => {
    const {mall_id} = req.query;
    if (!mall_id){
        let err = new Error("mall_id is missing!");
        err.status = 400;
        next(err);
    }
    //no auth token required
    axios({
        method:"get",
        url: `https://${mall_id}.cafe24api.com/api/v2/products`,
        headers: {
            "Content-Type": "application/json",
            "X-Cafe24-Client-Id": `${CLIENT_ID}`
        }
    })
    .then(data=>{
        const d = data.data.products;
        const response = {
            status: 200,
            data: d
        }
        res.json(response);
    })
    .catch(err=>{
        console.log(err);
        next(err);
    })
}