//hard-coded clientId
const clientId = "vKRKfJADOKRJT5nAM4qEDC"

window.addEventListener("load",function(event) {
    (function(CAFE24API) {
        $("#mallid-display").html(`<h2>Your mall id is: ${CAFE24API.MALL_ID}</h2>`)
        })(CAFE24API.init(clientId));
 },false)