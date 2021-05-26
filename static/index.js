window.addEventListener("load", (event)=>{
    //visit Font API endpoint
    fetch("/font", {
        method:"GET"
    })
    .then(res=>res.json())
    .then(data=>{
        const products = data.data;
        let innerHTML = "";
        for (const product of products){
            if (product.product_name && product.price){
                innerHTML += `<p>${product.product_name}, price: ${product.price}</p>`;
            }
        }
        $("#font-display").html(`${innerHTML}`);
    })
    .catch(err=>{
        console.log(err);
    })

    //visit Admin API endpoint
    fetch("/admin", {
        method: "GET"
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if (data.status == 401){
            $("#admin-display").html(`<a href=\"/auth\" role="button"> You need to authenticate to visit Admin API </a>`);
        } else if (data.status == 200) {
            const products = data.data;
            let innerHTML = "";
            for (const product of products){
                if (product.product_name && product.supply_price){
                    innerHTML += `<p>${product.product_name}, supply price: ${product.supply_price}</p>`;
                }
            }
            $("#admin-display").html(`${innerHTML}`);
        } else {
            throw new Error(data.message);
        }
    })
    .catch(err =>{
       console.log(err);
    })
})