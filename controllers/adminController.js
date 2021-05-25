const axios = require("axios")
require("dotenv").config()
const MALL_ID = process.env.MALL_ID

exports.adminController = async (req, res, next) => {
    //auth token is required
    const {token} = req;
    if (!token){
        let err = new Error("Not authenticated!");
        err.status = 401;
        next(err);
    } else {
        axios({
            method:"get",
            url: `https://${MALL_ID}.cafe24api.com/api/v2/admin/products`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
}