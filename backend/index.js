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
const { pathParamValidator } = require('./utils/param_validator');
const { postUserValidator, patchUserValidator } = require('./utils/user_validator');

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
    const [users, total] = await userModel.getUsers(query);
    res.setHeader('x-total-count', total);
    res.send(users);
  } catch (err) {
    next(err);
  }
});

app.get('/api/users/:id', pathParamValidator, async (req, res, next) => {
  const { id } = req.params;
  try {
    const [user] = await userModel.findUsersBy({ id });
    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/users', postUserValidator, async (req, res, next) => {
  try {
    const { body } = req;
    const resp = await userModel.createUser(body);
    res.status(201).send(resp);
  } catch (err) {
    next(err);
  }
});

app.patch('/api/users/:id', pathParamValidator, patchUserValidator, async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await userModel.updateUser(id, body);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
});

app.delete('/api/users/:id', pathParamValidator, async (req, res, next) => {
  const { id } = req.params;
  try {
    await userModel.deleteUser(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  logger.error('Returning error:', err.message);
  res.status(400).send(err.message);
});

app.listen(port, () => {
  logger.log(`Server is listening on port ${port}`);
});
