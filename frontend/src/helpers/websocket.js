import { io, Socket } from "socket.io-client"; // eslint-disable-line no-unused-vars

/**@type Socket */
let ws = null;

/**
 * Starts webSocket connection, makes initial handshake
 */
function initWebSocket() {
  ws = io('ws://localhost:3210'); //! fixme config

  ws.on('handshake', (data) => {
    console.log('websocket connect:', data);
  });
}

/**
 * Sends datachunk to the server, notifies the server whenever the chunk is the last
 * @param {Blob} chunk
 * @param {boolean} isLast
 */
function writeChunk(chunk, isLast = false) {
  ws.emit('video-stream', { chunk, isLast });
}

export {
  initWebSocket,
  writeChunk
};
