const express = require('express');
const cors = require('cors');
const app = express();
const port = 4321;

const colors = require('colors');
colors.enable();

const { logger } = require('./utils/logger');
const dbHelper = require('./db').getInstance();
const UserModel = require('./models/user_model');
const { queryValidator } = require('./utils/query_validator');

app.use(cors());
app.use(express.json());
app.use((req, _, next) => {
  logger.log(req.method, req.path, req.query, req.body);
  next();
});

const userModel = new UserModel(dbHelper);

app.get('/api/users', queryValidator, async (req, res, next) => {
  const { query } = req;

  try {
    const users = await userModel.getUsers(query);
    res.send(users);
  } catch (err) {
    next(err);
  }
});

app.post('/api/users', async (req, res, next) => {
  try {
    const { body } = req;
    const resp = await userModel.createUser(body);
    res.status(201).send(resp);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/users/:id', async (req, res, next) => {
  logger.log('req.params:', req.params);
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      throw new Error('invalid user id, should be number');
    }

    await userModel.deleteUser(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

app.use((err, _req, res, _next) => {
  logger.error(err.message);
  res.status(400).send(err.message);
});

app.listen(port, () => {
  logger.log(`Server is listening on port ${port}`);
});
