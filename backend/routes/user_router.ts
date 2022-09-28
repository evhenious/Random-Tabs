import { Router } from 'express';

import DbHelper from '../db';
import UserModel from '../models/user_model';

import { queryValidator } from '../utils/query_validator';
import { pathParamValidator } from '../utils/param_validator';
import { postUserValidator, patchUserValidator } from '../utils/user_validator';
import { iExtendedRequest } from '../interfaces';

const userRouter = Router();
const dbHelperInstance = DbHelper.getInstance();
const userModel = new UserModel(dbHelperInstance);

userRouter.get('/', queryValidator, async (req, res, next) => {
  const { parsedQuery } = req as iExtendedRequest;

  try {
    const { users, total } = await userModel.getUsers(parsedQuery);
    res.setHeader('x-total-count', total);
    res.send(users);
  } catch (err) {
    next(err);
  }
});

userRouter.get('/:id', pathParamValidator, async (req, res, next) => {
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

userRouter.post('/', postUserValidator, async (req, res, next) => {
  try {
    const { body } = req;
    const resp = await userModel.createUser(body);
    res.status(201).send(resp);
  } catch (err) {
    next(err);
  }
});

userRouter.patch('/:id', pathParamValidator, patchUserValidator, async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await userModel.updateUser(id, body);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
});

userRouter.delete('/:id', pathParamValidator, async (req, res, next) => {
  const { id } = req.params;
  try {
    await userModel.deleteUser(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export { userRouter };
