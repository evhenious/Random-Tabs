const { logger } = require('./logger');

const allowedQueryParams = {
  offset: { validator: parseNumber, defaultValue: 0 },
  limit: { validator: parseNumber, defaultValue: 10 },
};

function parseNumber(val) {
  const parsed = Number(val);
  if (isNaN(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

function queryValidator(req, _res, next) {
  const parsedQuery = {};

  // check supplied params first
  Object.entries(req.query).forEach(([key, val]) => {
    if (!allowedQueryParams[key]) {
      logger.warn(`Unsupported param [${key}] skipped`);
      return;
    }

    const { validator } = allowedQueryParams[key];
    const parsedValue = validator(val);
    if (!parsedValue) {
      throw new Error(`invalid [${key}] value, should be number`);
    }

    parsedQuery[key] = parsedValue;
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
