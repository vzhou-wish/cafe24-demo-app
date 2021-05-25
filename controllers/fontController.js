const axios = require("axios")
require("dotenv").config()
const MALL_ID = process.env.MALL_ID
const CLIENT_ID = process.env.CLIENT_ID

exports.fontController = async (req, res, next) => {
    //no auth token required
    axios({
        method:"get",
        url: `https://${MALL_ID}.cafe24api.com/api/v2/products`,
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