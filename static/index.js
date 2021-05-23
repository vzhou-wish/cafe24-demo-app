window.addEventListener("load", (event)=>{
    fetch(`/get-info`, {
        method:"GET"
    })
    .then(res=>res.json())
    .then(data=>{
        const products = data.data;
        let innerHTML = "";
        for (const product of products){
            if (product.product_name && product.price){
                innerHTML += `<p>${product.product_name} : ${product.price}</p>`;
            }
        }
        $("#info-display").html(`${innerHTML}`);
    })
    .catch(err=>{
        console.log(err);
    })
})