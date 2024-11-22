// This is a scriptable app that will be run by the Scriptable app on your iOS device.

let loginUrl = "https://www.heraeus-gold.de/de/login"
let baseUrl = "https://www.heraeus-gold.de/de/mein_golddepot/meinsparplan/step1"
let username = "yourUsername"
let password = "yourPassword"


let request = new Request(loginUrl)
request.method = "POST"
request.addParameterToMultipart("username", username)
request.addParameterToMultipart("password", password)
let response = await request.loadString()
console.log(response)
    // Get PHPSESSID cookie
let cookie = request.response.cookies.PHPSESSID
console.log(cookie)

// Now request baseUrl
let request2 = new Request(baseUrl)
request2.method = "GET"
request2.headers = {
    "Cookie": "PHPSESSID=" + cookie
}

let response2 = await request2.loadString()
console.log(response2)


// Now get content of div class sp_statBody
let regex = /<div class="sp_statBody">(.*)<\/div>/
let match = response2.match(regex)

if (match) {
    console.log(match[1])
}