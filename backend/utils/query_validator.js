const { logger } = require('./logger');

const allowedQueryParams = {
  offset: { validator: parseNumber, defaultValue: 0 },
  limit: { validator: parseNumber, defaultValue: 10 },
};

function parseNumber(val) {
  const parsed = Number(val);
  if (isNaN(parsed)) {
    return { isValid: false, error: 'should be a number'};
  }

  if (parsed < 0) {
    return { isValid: false, error: 'should be >= 0' };
  }

  return { isValid: true, value: parsed};
}

function queryValidator(req, _res, next) {
  const parsedQuery = {};

  // check supplied params first
  Object.entries(req.query).forEach(([key, val]) => {
    if (!allowedQueryParams[key]) {
      logger.warn(`unsupported query param [${key}] skipped`);
      return;
    }

    const { validator } = allowedQueryParams[key];
    const { isValid, value, error } = validator(val);
    if (!isValid) {
      throw new Error(`invalid query param [${key}], ${error}`);
    }

    parsedQuery[key] = value;
  });

  // assign defaults for missing required params
  Object.keys(allowedQueryParams).forEach((key) => {
    if (!(key in parsedQuery)) {
      parsedQuery[key] = allowedQueryParams[key].defaultValue;
    }
  });

  req.query = parsedQuery;
  next();
}

module.exports = {
  queryValidator,
};
