let express = require('express')
let app = express()
app.use(express.static(__dirname))
// http服务器
app.listen(8080, () => {
  console.log('point in 8080!')
})

let WebSocketServer = require('ws').Server
// 用WS 模块启动一个websocket服务器，监听8888端口
let wsServer = new WebSocketServer({
  port: 8888
})
// 监听客户端的链接请求， 当客户端链接服务器的时候，就会触发connection事件
// socket代表一个客户端，不是所有客户端共享的，而是每个客户端都要一个socket
wsServer.on('connection', (socket) => {
  console.log('客户端连接成功')
  // 监听对方发送的消息
  socket.on('message', (message) => {
    console.log('接收到客户端的消息', message)
    socket.send('服务器响应', message)
  })
})

// let http = require('http')
// let server = http.createServer(function (req, res) {
//   res.end('ok')
// })
// server.listen(9090)
