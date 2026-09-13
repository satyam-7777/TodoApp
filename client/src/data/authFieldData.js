const nameField = {
  label: "Name",
  type: "text",
  placeholder: "Name",
  required: true,
  minLength: 3,
  name: "name",
  id: "name",
};

const emailField = {
  label: "Email",
  type: "email",
  placeholder: "Email",
  required: true,
  minLength: 5,
  name: "email",
  id: "email",
};

const phoneField = {
  label: "Phone Number (Optional)",
  type: "tel",
  placeholder: "Phone Number (Optional)",
  required: false,
  minLength: 10,
  maxLength: 10,
  name: "phone",
  id: "phoneNumber",
  inputMode: "numeric",
  pattern: "[6-9][0-9]{9}",
};

const passwordField = {
  label: "Password",
  type: "password",
  placeholder: "Password",
  required: true,
  minLength: 8,
  name: "password",
  id: "password",
};

const confirmPasswordField = {
  label: "Confirm Password",
  type: "password",
  placeholder: "Confirm Password",
  required: true,
  minLength: 8,
  name: "confirmPassword",
  id: "confirmPassword",
};

const signupFields = [nameField, emailField, phoneField, passwordField, confirmPasswordField];

const loginFields = [emailField, passwordField];

export { signupFields, loginFields };
