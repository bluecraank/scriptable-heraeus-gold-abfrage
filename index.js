// This is a scriptable app that will be run by the Scriptable app on your iOS device.

let loginUrl = "https://www.heraeus-gold.de/de/login"
let baseUrl = "https://www.heraeus-gold.de/de/mein_golddepot/meinsparplan/step1"
let username = "yourUsername"
let password = "yourPassword"


let request = new Request(loginUrl)
request.method = "POST"
request.addParameterToMultipart("username", username)
request.addParameterToMultipart("passwort", password)
let response = await request.loadString()

// cookies is an object
let cookie = request.response.cookies[0].value

// get first cookie


// Now request baseUrl
let request2 = new Request(baseUrl)
request2.method = "GET"
request2.headers = {
    "Cookie": "PHPSESSID=" + cookie
}

let response2 = await request2.loadString()

const wv = new WebView();
await wv.loadHTML(response2);
// // Now get content of div class sp_statBody
const content = await wv.evaluateJavaScript(`document.querySelector('.sp_statBody').innerHTML`)
console.log(content)