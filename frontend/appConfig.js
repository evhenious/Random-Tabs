const galleryConfig = {
  lazy: true,
  placeholder: '/images/empty.png',
  defaultPageParams: {
    limit: 10,
  },
};

const userListConfig = {
  columns: [
    { id: 'id', title: 'ID' },
    { id: 'name', title: 'Name' },
    { id: 'email', title: 'Email' },
    { id: 'phone', title: 'Tel. #' },
  ],
};

const userEditFormConfig = {
  fields: [
    { id: 'name', label: 'User Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'phone', label: 'User Tel #' },
  ],
  _edit: {
    buttonText: 'Save Changes',
    title: 'Edit User Details',
  },
  _create: {
    buttonText: 'Create',
    title: 'Create New User',
  }
};

export { galleryConfig, userListConfig, userEditFormConfig };
