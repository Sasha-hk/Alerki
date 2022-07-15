/* eslint-disable max-len */

export const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const usernamePattern = /^[a-zA-Z_\-0-9]+$/;

export const userConfig = {
  email: {
    description: 'Email',
    minLength: 5,
    maxLength: 319,
    type: 'string',
    pattern: String(emailPattern),
    example: 'james@gmail.com',
    patternExp: emailPattern,
  },
  username: {
    description: 'Username',
    minLength: 4,
    maxLength: 20,
    type: 'string',
    example: 'james',
    patternExp: usernamePattern,
  },
  password: {
    description: 'Password',
    minLength: 6,
    maxLength: 50,
    type: 'string',
    example: 'dIda*20/fa',
  },
};
