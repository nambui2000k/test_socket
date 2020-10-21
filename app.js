let express = require('express')
let app = express()
let http = require('http').createServer(app)
let io = require('socket.io')(http)
const messageArr = {data: []}
const RECEIVE = "RECEIVE"
const SEND = "SEND"
io.on('connect', (socket) => {
    socket.on(SEND, (data) => {
        messageArr.data.push(JSON.parse(data))
        io.emit(RECEIVE, JSON.stringify(messageArr))
    })
    console.log("a user online")
    socket.emit(RECEIVE, JSON.stringify(messageArr))
})
http.listen(process.env.PORT || 8120)

app.get("/", (async (req, res) => {
    res.writeHead(200, {token: "123"})
    res.end(JSON.stringify({message: "Hello", status: 200}))
}))

app.get("/test",(req,res)=>{
    res.end("ABF")
})