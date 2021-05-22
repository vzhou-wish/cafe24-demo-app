require("dot-env").config()

const MALL_ID = process.env.MALL_ID
const CLIENT_ID = process.env.CLIENT_ID
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

window.addEventListener("load", (event)=>{
    fetch(`https://${MALL_ID}.cafe24api.com/api/v2/admin/categories/40`, {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ACCESS_TOKEN}`
        }
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        $("#mallid-display").html(`<h2>${data}</h2>`)
    })
    .catch(err=>{
        console.log(err)
    })
})