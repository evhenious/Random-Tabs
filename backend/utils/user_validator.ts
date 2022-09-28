import { NextFunction, Request, Response } from 'express';
import { UserFieldsValidator } from '../interfaces';

const fields: UserFieldsValidator = {
  id: { validator: restrictedField },
  name: { validator: validateNotEmptyString, required: true },
  email: { validator: validateNotEmptyString, required: true },
  phone: { transform: (val) => val || null },
};

/**
 * Hard stop for param validation. Does not allow a param to be processed
 */
function restrictedField() {
  return 'is restricted field, not allowed to send';
}

/**
 * Makes sure value is non-empty string
 */
function validateNotEmptyString(value: string | number): string | null {
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
function postUserValidator(req: Request, _res: Response, next: NextFunction) {
  Object.entries(fields).forEach(([key, value]) => {
    const { required, validator, transform } = value;

    if (!(key in req.body)) {
      if (required) throw new Error(`[${key}] field is required`);
      return;
    }

    const fieldValue = req.body[key];
    const error = validator?.(fieldValue);
    if (error) {
      throw new Error(`[${key}] ${error}`);
    }

    if (transform) {
      req.body[key] = transform(fieldValue);
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
function patchUserValidator(req: Request, _res: Response, next: NextFunction) {
  const patchFields = Object.keys(req.body);
  if (!patchFields.length) {
    throw new Error('user data not provided');
  }

  Object.entries(fields).forEach(([key, value]) => {
    const { validator, transform } = value;

    if (!(key in req.body)) {
      return;
    }

    const fieldValue = req.body[key];
    const error = validator?.(fieldValue);
    if (error) {
      throw new Error(`[${key}] ${error}`);
    }

    if (transform) {
      req.body[key] = transform(fieldValue);
    }
  });

  next();
}

export { postUserValidator, patchUserValidator };
