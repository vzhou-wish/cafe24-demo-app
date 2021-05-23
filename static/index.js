require("dot-env").config()

window.addEventListener("load", (event)=>{
    fetch(`/get-info`, {
        method:"GET"
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        $("info-display").html(`<h2>${data}</h2>`)
    })
    .catch(err=>{
        console.log(err);
    })
})