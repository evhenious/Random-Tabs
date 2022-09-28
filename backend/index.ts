import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

const app = express();

//! fixme: env?
const port = 4321;
const wsPort = 3210;

import { createServer } from 'http';
import { Server } from 'socket.io';

import colors from 'colors';
colors.enable();

import dbHelper from './db/index';
import { userRouter } from './routes/user_router';
import { writeVideoStream } from './routes/video_router';
import { logger } from './utils/logger';

const httpServer = createServer(express());
//! fixme: config
const webSocketServer = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

webSocketServer.on('connection', (socket) => {
  socket.emit('handshake', { isOk: true });
  socket.on('video-stream', writeVideoStream);
});

app.use(cors());
app.use(express.json());
app.use((req, _, next) => {
  logger.log(req.method, req.path, req.query, req.body);
  next();
});

// all routes related to 'users' resource are incapsulated in a separate router
app.use('/api/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error('Returning error:', err.message);
  res.status(400).send(err.message);
});

// start all servers
httpServer.listen(wsPort, () => {
  logger.log(`WebSocket Server is listening on port ${wsPort}`);
});

const server = app.listen(port, () => {
  logger.log(`REST Server is listening on port ${port}`);
});

process.on('SIGTERM', stopServer);
process.on('SIGINT', stopServer);

async function stopServer() {
  logger.log('SIGTERM signal received. Closing servers...');

  await Promise.all([
    new Promise<void>((res) => {
      webSocketServer.close(() => {
        logger.log('WebSocket Http server closed.');
        res();
      });
    }),
    new Promise<void>((res) => {
      server.close(async () => {
        logger.log('REST Http server closed.');
        await dbHelper.getInstance().disconnect();
        logger.log('DB connections are down.');
        res();
      });
    }),
  ]);

  logger.warn('ALL SERVERS ARE DOWN.');
  process.exit(0);
}
