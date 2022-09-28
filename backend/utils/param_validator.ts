import { NextFunction, Request, Response } from 'express';

function pathParamValidator(req: Request, _res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    throw new Error('invalid user id, should be a number');
  }

  next();
}

export { pathParamValidator };
