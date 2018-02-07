var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

// var bot = linebot({
//   channelId: '1561292790',
//   channelSecret: 'dd019042a09779942b5a37df9eb9ebcc',
//   channelAccessToken: '06V3hxBoYhxHgA/cn2auTpZ9EGbB6dvVQeIQJT6PW2i1uuXIAwlNj6IKzpl8zaWFoKagcL6Ou32MVyLdsWQf2njd/asEoKwUrTrzwk4gJM1ZFVeJ9HiKZsn+LaIrqqWp9rfXlkIMOVOPQafEaCJk8AdB04t89/1O/w1cDnyilFU='
// });

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 80))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
	res.send('Hello World')
})

app.post('/webhook', (req, res) => {
  var text = req.body.events[0].message.text
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log(text, sender, replyToken)
  console.log(typeof sender, typeof text)
  // console.log(req.body.events[0])
  if (text === 'สวัสดี' || text === 'HELLO' || text === 'Hello' || text === 'hello') {
    sendText(sender, text)
  }
  res.sendStatus(200)
})

function sendText (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'สวัสดีครับ นี่คือ Message from API 💞'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer key Api'
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})