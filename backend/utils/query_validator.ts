import { NextFunction, Request, Response } from 'express';
import { iExtendedRequest, iParsedQuery, QueryParamsValidator } from '../interfaces';

const { logger } = require('./logger');

const supportedQueryParams: QueryParamsValidator = {
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
    limit: supportedQueryParams.limit.defaultValue,
    offset: supportedQueryParams.offset.defaultValue,
  };

  // check supplied params first
  Object.entries(req.query).forEach(([key, val]) => {
    if (!supportedQueryParams[key]) {
      logger.warn(`unsupported query param [${key}] skipped`);
      return;
    }

    const { validator, defaultValue } = supportedQueryParams[key];
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
