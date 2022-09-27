const express = require('express');
const cors = require('cors');
const app = express();
const port = 4321;

const colors = require('colors');
colors.enable();

const { logger } = require('./utils/logger');
const { userRouter } = require('./routes/user_router');

const dbHelper = require('./db').getInstance();

app.use(cors());
app.use(express.json());
app.use((req, _, next) => {
  logger.log(req.method, req.path, req.query, req.body);
  next();
});

// all routes related to 'users' resource are incapsulated in a separate router
app.use('/api/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  logger.error('Returning error:', err.message);
  res.status(400).send(err.message);
});

const server = app.listen(port, () => {
  logger.log(`Server is listening on port ${port}`);
});

process.on('SIGTERM', stopServer);
process.on('SIGINT', stopServer);

function stopServer() {
  logger.log('SIGTERM signal received. Closing http server...');
  server.close(async () => {
    logger.log('Http server closed.');

    try {
      await dbHelper.disconnect();
      logger.log('DB connections are down.');
    } catch (err) {
      logger.error(err);
    } finally {
      process.exit(0);
    }
  });
}
