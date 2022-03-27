const username = (username: string) => ({
  value: username,
  name: 'username',
  type: 'string',
  maxLength: 20,
  minLength: 4,
});

const email = (email: string) => ({
  value: email,
  name: 'email',
  type: 'string',
  pattern: /^\w+@\w+\.\w+/,
  maxLength: 100,
  minLength: 3,
});

const password = (password: string) => ({
  value: password,
  name: 'password',
  required: true,
  type: 'string',
  minLength: 4,
  maxLength: 100,
});

const profileType = (profileType: string) => ({
  value: profileType,
  name: 'profileType',
  type: 'string',
  pattern: /(client|master)/,
});

export default {
  username,
  email,
  profileType,
  password,
};
