const MALL_ID = "violetzhou"
const CLIENT_ID = "vKRKfJADOKRJT5nAM4qEDC"
const ACCESS_TOKEN = "O561i3AlHBnrXLeGo8c4sC"

window.addEventListener("load", (event)=>{
    fetch(`https://${MALL_ID}.cafe24api.com/api/v2/admin/categories/40`, {
        mode: "no-cors",
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
