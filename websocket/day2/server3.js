// websocket 是依赖http服务器的
// 1. 我们需要创建一个http服务器，提供握手

let express = require('express')
let app = express()
app.use(express.static(__dirname))
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})
let server = require('http').createServer(app)
server.listen(8080)

// socket 依赖http服务, io 表示websocket服务器
let io = require('socket.io')(server)
io.on('connection', (socket) => {
  // 每个客户端都会有一个socket对象
  console.log('客户端已经连接')
  socket.on('message', (message) => {
    console.log(message)
    socket.send('server:' + message)
  })
})
