const usernameField = (username: string) => ({
  value: username,
  name: 'username',
  type: 'string',
  maxLength: 20,
  minLength: 4,
});

const emailField = (email: string) => ({
  value: email,
  name: 'email',
  type: 'string',
  pattern: /^\w+@\w+\.\w+/,
  maxLength: 100,
  minLength: 3,
});

const passwordField = (password: string) => ({
  value: password,
  name: 'password',
  required: true,
  type: 'string',
  minLength: 4,
  maxLength: 100,
});

const profileTypeField = (profileType: string) => ({
  value: profileType,
  name: 'profileType',
  type: 'string',
  pattern: /(client|master)/,
});

export default {
  usernameField,
  emailField,
  profileTypeField,
  passwordField,
};
