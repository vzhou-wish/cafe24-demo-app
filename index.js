//hard-coded clientId
const request = require("request")

const MALL_ID = "violetzhou"
const CLIENT_ID = "vKRKfJADOKRJT5nAM4qEDC"
const ACCESS_TOKEN = "BhtKfIkdKaWMV5jQ2pkZtA"

//display maillId
const loadMallId = ()=>{
    (function(CAFE24API) {
        $("#mallid-display").html(`<h2>Your mall id is: ${CAFE24API.MALL_ID}</h2>`)
        })(CAFE24API.init(CLIENT_ID));
}

//download scriptTag to all pages
const loadScriptTag = ()=>{
    return new Promise((resolve, reject)=>{
        const payload = {
            client_id : CLIENT_ID,
            display_location: "all"
        }

        const options = { 
            method: 'POST',
            url: `https://${MALL_ID}.cafe24api.com/api/v2/admin/scripttags`,
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify(payload)
        };

        request(options, (error, response, body) => {
            if (error){
                reject(error)
            }
            resolve(body)
        });
    })
}

window.addEventListener("load", (event)=>{
    loadScriptTag
    .then(res=>{
        console.log(res)
        //now we should have access to the CAFE24API object
        loadMallId()
    })
    .catch(err=>{
        console.log(err);
    })
})
