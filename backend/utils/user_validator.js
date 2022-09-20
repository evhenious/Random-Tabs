const fields = {
  name: { required: true, validate: validateNotEmptyString },
  email: { required: true, validate: validateNotEmptyString },
};

/**
 * @param {*} value
 * @returns {string|null}
 */
function validateNotEmptyString(value) {
  if (typeof value !== 'string') {
    return 'should be a string';
  }

  if (!value.trim()) {
    return 'cannot be empty string';
  }

  return null;
}

function postUserValidator(req, _res, next) {
  Object.keys(fields).forEach((key) => {
    const { required, validate } = fields[key];

    if (!(key in req.body) && required) {
      throw new Error(`[${key}] field is required`);
    }

    const error = validate(req.body[key]);
    if (error) {
      throw new Error(`[${key}] ${error}`);
    }
  });

  next();
}

function patchUserValidator(req, _res, next) {
  const patchFields = Object.keys(req.body);
  if (!patchFields.length) {
    throw new Error('user data not provided');
  }

  Object.keys(fields).forEach((key) => {
    const { required, validate } = fields[key];

    if (key in req.body && required) {
      const error = validate(req.body[key]);
      if (error) {
        throw new Error(`[${key}] ${error}`);
      }
    }
  });

  next();
}

module.exports = {
  postUserValidator,
  patchUserValidator,
};
