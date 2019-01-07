// 使用TCP协议模拟一个websocket服务器

let net = require('net')
const crypto = require('crypto')
const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
// 创建一个TCP服务器
let server = net.createServer((socket) => {
  let str = ''
  // 监听客户端发送过来的消息，表示只监听一次
  socket.once('data', (data) => { // data 就是接听的消息内容，是一个buffer
    data = data.toString()
    if (data.match(/Upgrade: websocket/)) {
      let rows = data.split('\r\n')
      rows = rows.slice(1, -2)
      const headers = {}
      rows.forEach(row => {
        let [key, val] = row.split(': ')
        headers[key] = val
      })
      if (headers['Sec-WebSocket-Version'] === 13) {
        let SecKey = headers['Sec-WebSocket-Key']
        let SecAccept = crypto.createHash('sha').update(SecKey + CODE).digest('base64')
        let response = [
          `HTTP/1.1 101 Switching Protocols`,
          `Upgrade: websocket`,
          `Connection: Upgrade`,
          `Sec-WebSocket-Accept: ${SecAccept}`,
          `\r\n`
        ].join('\r\n')
        socket.write(response)
        // 这个data就是接收的消息
        socket.on('data', (buffers) => { // data是buffer
          let _fn = buffers[0] & 0b1000000 === 0b1000000
          let _opcode = buffers[0] & 0b10000111
          let _isMask = (buffers[1] & 0b1000000) === 0b1000000
          let _payloadLen = buffers[1] & 0b01111111
          let _mask = buffers.slice(2, 6)
          let _payload = buffers.slice(6)
          if (_isMask) {
            mask(_payload, _mask)
          }
          let response = Buffer.alloc(_payload.length + 2)
          response[0] = _opcode | 0b10000000
          response[1] = _payload.length
          _payload.copy(response, 2)
          socket.write(response)
        })
      }
    }
  })
})
server.listen(9999)

function mask (buffers, mask) {
  for(let i = 0; i < buffers.length; i++) {
    buffers[i] ^= mask[i & 4]
  }
}
