window.addEventListener("load", (event)=>{
    //get mall id from the url
    //there is probably a better way to do this
    const url = window.location.href;
    const regex =  /https:\/\/(.*)\.cafe24shop\.com/;
    console.log(url.match(regex));
    const mallId = url.match(regex)[1]

    //visit front API endpoint
    fetch(`/front?mall_id=${mallId}`, {
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
        $("#front-display").html(`${innerHTML}`);
    })
    .catch(err=>{
        console.log(err);
    })

    //visit Admin API endpoint
    fetch(`/admin?mall_id=${mallId}`, {
        method: "GET"
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if (data.status == 401){
            $("#admin-display").html(`<a href=\"/auth?mall_id=${mallId}\" role="button"> You need to authenticate to visit Admin API </a>`);
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