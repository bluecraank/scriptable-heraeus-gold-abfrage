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

// Now parse content
let amount = content.match(/Depotwert: <b>(.*?)<\/b>/)[1]
console.log(content)

let widget = createWidget(amount, "€")
if (config.runsInWidget) {
    // create and show widget
    Script.setWidget(widget)
    Script.complete()
} else {
    widget.presentSmall()
}

// Assemble widget layout 
function createWidget(amount, currency) {
    let w = new ListWidget()
    w.backgroundColor = new Color("#1A1A1A")

    w.addSpacer(8)

    let staticText = w.addText("Golddepot")
    staticText.textColor = Color.white()
    staticText.font = Font.boldSystemFont(12)
    staticText.centerAlignText()

    w.addSpacer(8)

    let amountTxt = w.addText(amount + ' ' + currency)
    amountTxt.textColor = Color.orange()
    amountTxt.font = Font.systemFont(16)
    amountTxt.centerAlignText()

    w.addSpacer(8)

    // Show current date in format Day. Month Year
    let currentDate = new Date();
    let lastDate = w.addDate(currentDate);
    lastDate.textColor = Color.gray()
    lastDate.font = Font.mediumSystemFont(10)
    lastDate.centerAlignText();

    w.setPadding(0, 0, 0, 0)
    return w
}