import * as yup from 'yup';

const userSchema = yup.object().shape({
  name: yup.string().required('Name cannot be empty'),
  email: yup.string().email('Invalid email format').required('Email cannot be empty'),
  phone: yup.string().matches(/(\d| |\+|-|\(|\)|\.)/, { excludeEmptyString: true, message: 'Invalid phone format' }),
});

/**
 * @param {Object} userData
 * @returns {Promise<Object>} valid user data - if checks passed
 * @throws yup.ValidationError
 */
function validateUser(userData) {
  return userSchema.validate(userData, { abortEarly: false, strict: true });
}

export { validateUser };
