const fields = {
  id: { validate: restrictedField },
  name: { required: true, validate: validateNotEmptyString },
  email: { required: true, validate: validateNotEmptyString },
};

function restrictedField() {
  return 'is restricted field, not allowed to send';
}

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

/**
 * Validates request body for POST (user creation).
 * Fields marked as required in fields config **must** be in body
 *
 * @throws if any field fails validation
 *
 * @param {*} req
 * @param {*} _res
 * @param {*} next
 */
function postUserValidator(req, _res, next) {
  Object.keys(fields).forEach((key) => {
    const { required, validate } = fields[key];

    if (!(key in req.body)) {
      if (required) throw new Error(`[${key}] field is required`);
      return;
    }

    const error = validate(req.body[key]);
    if (error) {
      throw new Error(`[${key}] ${error}`);
    }
  });

  next();
}

/**
 * Validates request body for PATCH (user update).
 * Fields marked as required in fields config **must** be NOT EMPTY in body,
 * but they can be omitted at all
 *
 * @throws if empty body or any field fails validation
 *
 * @param {*} req
 * @param {*} _res
 * @param {*} next
 */
function patchUserValidator(req, _res, next) {
  const patchFields = Object.keys(req.body);
  if (!patchFields.length) {
    throw new Error('user data not provided');
  }

  Object.keys(fields).forEach((key) => {
    const { validate } = fields[key];

    if (!(key in req.body)) {
      return;
    }

    const error = validate(req.body[key]);
    if (error) {
      throw new Error(`[${key}] ${error}`);
    }
  });

  next();
}

module.exports = {
  postUserValidator,
  patchUserValidator,
};
