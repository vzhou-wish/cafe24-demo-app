const axios = require("axios")
require("dot-env").config()
const MALL_ID = process.env.MALL_ID
const CLIENT_ID = process.env.CLIENT_ID
//const ACCESS_TOKEN = process.env.ACCESS_TOKEN

exports.getInfoController = async (req, res, next) => {
    axios({
        method:"get",
        url: `https://${MALL_ID}.cafe24api.com/api/v2/products`,
        headers: {
            "Content-Type": "application/json",
            "X-Cafe24-Client-Id": `${CLIENT_ID}`
        }
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        res.json(data);
    })
    .catch(err=>{
        console.log(err);
    })
}