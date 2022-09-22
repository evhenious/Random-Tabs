import * as yup from 'yup';
import { userEditFormConfig as config } from '../../appConfig';

const userSchema = yup.object().shape({
  name: yup.string().required('Name cannot be empty'),
  email: yup.string().email('Invalid email format').required('Email cannot be empty'),
  phone: yup.string().matches(/(\d| |\+|-|\(|\)|\.)/, { excludeEmptyString: true, message: 'Invalid phone format' }),
});

/**
 * Cleans up invalid field state
 * @param {InputEvent} event
 */
function cleanFieldState(event) {
  if (event.target.classList.contains('invalid')) {
    event.target.classList.remove('invalid');
    document.getElementById(`${event.target.id}-error`).innerText = '';
  }
}

/**
 * Parses validation error and shows error messages
 * @param {yup.ValidationError} error
 */
function setErrorState(error) {
  const issues = error.inner.map(({ path, message }) => ({ path, message }));
  console.warn(issues);

  issues.forEach((issue) => {
    document.getElementById(`user-${issue.path}-error`).innerText = issue.message;
    document.getElementById(`user-${issue.path}`).classList.add('invalid');
  });
}

/**
 * each input has it's label and specific place to show validation error
 * @param {Object} userData potential user data - if we're up to EDIT user
 * @returns {HTMLDivElement[]}
 */
function createFormElements(userData) {
  const formElements = config.fields.map((item) => {
    const inputElem = document.createElement('input');
    inputElem.id = `user-${item.id}`;
    inputElem.value = userData[item.id] || '';

    const labelElem = document.createElement('label');
    labelElem.setAttribute('for', inputElem.id);
    labelElem.innerText = item.label;

    const errorElem = document.createElement('span');
    errorElem.classList.add('form-error');
    errorElem.id = `${inputElem.id}-error`;

    // to conveniently manage input and it's label + error
    const wrapper = document.createElement('div');
    wrapper.append(labelElem, inputElem, errorElem);

    return wrapper;
  });

  return formElements;
}

/**
 * Creates user edit form
 * @param {Function} onSubmit click handler for form button. Will receive userData as parameter
 * @param {Object} options
 * @param {Object} options.userData
 * @param {boolean} [options.isEdit]
 * @returns {HTMLFormElement}
 */
function getEditUserForm(onSubmit, { userData = {}, isEdit = false } = {}) {
  const currentActionConfig = isEdit ? config._edit : config._create;

  const form = document.createElement('form');
  form.classList.add('user-edit-form');

  const title = document.createElement('div');
  title.classList.add('edit-form-title');
  title.innerText = currentActionConfig.title;

  if (userData.id) {
    form.setAttribute('data-user-id', userData.id);
  }

  const formControls = createFormElements(userData);
  form.addEventListener('input', cleanFieldState);

  const submitButton = document.createElement('button');
  submitButton.innerText = currentActionConfig.buttonText;

  //! event listener for SUBMIT button initiates here
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    // getting data from the form fields
    const userData = config.fields.reduce((acc, { id }) => {
      acc[id] = form.elements[`user-${id}`].value;
      return acc;
    }, {});

    // validate fields, if all is OK - hit API to save user data, if not - show errors
    //! .validate() passes _userData_ to onSubmit
    userSchema.validate(userData, { abortEarly: false, strict: true }).then(onSubmit).catch(setErrorState);
  });

  form.append(title, ...formControls, submitButton);

  return form;
}

export { getEditUserForm };
