import { NextFunction, Request, Response } from 'express';
import { iExtendedRequest, iParsedQuery, iQueryParams } from '../interfaces';

const { logger } = require('./logger');

const allowedQueryParams: iQueryParams = {
  limit: { validator: parseNumber, defaultValue: 10 },
  offset: { validator: parseNumber, defaultValue: 0 },
};

function parseNumber(val: string | number) {
  const parsed = Number(val);
  if (isNaN(parsed)) {
    return { error: 'should be a number' };
  }

  if (parsed < 0) {
    return { error: 'should be >= 0' };
  }

  return { value: parsed };
}

function queryValidator(req: Request, _res: Response, next: NextFunction) {
  const parsedQuery: iParsedQuery = {
    limit: allowedQueryParams.limit.defaultValue,
    offset: allowedQueryParams.offset.defaultValue,
  };

  // check supplied params first
  Object.entries(req.query).forEach(([key, val]) => {
    if (!allowedQueryParams[key]) {
      logger.warn(`unsupported query param [${key}] skipped`);
      return;
    }

    const { validator, defaultValue } = allowedQueryParams[key];
    const { value = defaultValue, error } = validator(val as string);
    if (error) {
      throw new Error(`invalid query param [${key}], ${error}`);
    }

    parsedQuery[key] = value;
  });

  (req as iExtendedRequest).parsedQuery = parsedQuery;
  next();
}

export { queryValidator };
