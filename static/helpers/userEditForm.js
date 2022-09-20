const formControlsConfig = [
  { id: 'name', label: 'User Name' },
  { id: 'email', label: 'Email Address' },
  { id: 'phone', label: 'User Tel #' },
];

/**
 * Creates user edit form
 * @param {Function} onCreate click handler for form button. Will receive userData as parameter
 * @returns {HTMLFormElement}
 */
function getEditUserForm(onCreate) {
  const form = document.createElement('form');
  form.classList.add('user-edit-form');

  const formControls = formControlsConfig.map((item) => {
    const inputElem = document.createElement('input');
    inputElem.id = `user-${item.id}`;

    const labelElem = document.createElement('label');
    labelElem.setAttribute('for', inputElem.id);
    labelElem.innerText = item.label;

    // to conveniently manage input and it's label
    const wrapper = document.createElement('div');
    wrapper.append(labelElem, inputElem);

    return wrapper;
  });

  const btn = document.createElement('button');
  btn.innerText = 'create';
  btn.addEventListener('click', (event) => {
    event.preventDefault();

    // we give our callback ref to the Data, not the Form -
    // so form user does not care about the structure of elements
    const userData = formControlsConfig.reduce((acc, { id }) => {
      acc[id] = form.elements[`user-${id}`].value;
      return acc;
    }, {});

    onCreate(userData);
  });

  form.append(...formControls, btn);

  return form;
}

export default getEditUserForm;
