// Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
// Sec-WebSocket-Key: yE9vskFdRoEnqbQ41O47Xg==
// Sec-WebSocket-Version: 13
// Upgrade: websocket


// 101 切换协议， http协议切换websocket协议
// HTTP/1.1 101 Switching Protocols
// Upgrade: websocket
// Connection: Upgrade
// Sec-WebSocket-Accept: 4xaPdgIZlu/rhxTXt7cYHCkExHw=

const crypto = require('crypto');
const number = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const webSocketKey = 'IHfMdf8a0aQXbwQO1pkGdA==';
let websocketAccept = require('crypto').createHash('sha1').update(webSocketKey + number).digest('base64');
console.log(websocketAccept);//aWAY+V/uyz5ILZEoWuWdxjnlb7E=
