// This is a scriptable app that will be run by the Scriptable app on your iOS device.

let loginUrl = "https://www.heraeus-gold.de/de/login"
let username = "yourUsername"
let password = "yourPassword"


function load() {
    let request = new Request(loginUrl)
    request.method = "POST"
    request.addParameterToMultipart("username", username)
    request.addParameterToMultipart("password", password)
    let response = request.loadString()
    console.log(response)
}

await load();