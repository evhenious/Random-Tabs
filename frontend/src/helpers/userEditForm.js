import { divide } from 'lodash';
import * as yup from 'yup';

const formControlsConfig = [
  { id: 'name', label: 'User Name' },
  { id: 'email', label: 'Email Address' },
  { id: 'phone', label: 'User Tel #' },
];

const CREATE_USER = 'Create User';

const userSchema = yup.object().shape({
  name: yup.string().required('Name cannot be empty'),
  email: yup.string().email('Invalid email format').required('Email cannot be empty'),
  phone: yup.string().matches(/(\d| |\+|-|\(|\)|\.)/, { excludeEmptyString: true, message: 'Invalid phone format' })
});

/**
 * Creates user edit form
 * @param {Function} onSubmit click handler for form button. Will receive userData as parameter
 * @param {Object} userData
 * @param {Object} config
 * @returns {HTMLFormElement}
 */
function getEditUserForm(onSubmit, userData = {}, config = {}) {
  const form = document.createElement('form');
  form.classList.add('user-edit-form');

  const title = document.createElement('div');
  title.classList.add('edit-form-title');
  title.innerText = config.title || CREATE_USER;

  if (userData.id) {
    form.setAttribute('data-user-id', userData.id);
  }

  const formControls = formControlsConfig.map((item) => {
    const inputElem = document.createElement('input');
    inputElem.id = `user-${item.id}`;
    inputElem.value = userData[item.id] || '';

    const labelElem = document.createElement('label');
    labelElem.setAttribute('for', inputElem.id);
    labelElem.innerText = item.label;

    // to conveniently manage input and it's label
    const wrapper = document.createElement('div');
    wrapper.append(labelElem, inputElem);

    return wrapper;
  });

  const errors = document.createElement('div');
  errors.classList.add('errors');
  form.insertAdjacentElement('afterend', errors);

  const btn = document.createElement('button');
  btn.innerText = config.buttonText || CREATE_USER;


  btn.addEventListener('click', (event) => {
    event.preventDefault();

    // we give our callback ref to the Data, not the Form -
    // so form user does not care about the structure of elements
    const userData = formControlsConfig.reduce((acc, { id }) => {
      acc[id] = form.elements[`user-${id}`].value;
      return acc;
    }, {});

    // validate fields
    userSchema.validate(userData, { abortEarly: false })
      .then(onSubmit)
      .catch(({ errors: err }) => {
        console.log(err);
        errors.replaceChildren(...err.map((e) => {
          const li = document.createElement('div');
          li.classList.add('validation-message');
          li.innerText = e;
          return li;
        }));
      });
  });

  form.append(title, ...formControls, btn);

  return form;
}

export default getEditUserForm;
