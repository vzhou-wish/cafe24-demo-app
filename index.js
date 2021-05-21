const MALL_ID = "violetzhou"
const CLIENT_ID = "vKRKfJADOKRJT5nAM4qEDC"
const ACCESS_TOKEN = "yxdSuBGBF9NnJ5GYEU23bC"

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
