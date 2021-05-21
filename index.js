const MALL_ID = "violetzhou"
const ACCESS_TOKEN = "O561i3AlHBnrXLeGo8c4sC"

window.addEventListener("load", (event)=>{
    axios({
        method:"get",
        url: `https://${MALL_ID}.cafe24api.com/api/v2/admin/categories/40`,
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
})
