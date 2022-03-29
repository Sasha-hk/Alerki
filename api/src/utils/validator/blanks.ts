import { IValidateItem } from '../../interfaces/validator.interface';

export const usernameField = (username: string): IValidateItem => ({
  value: username,
  name: 'username',
  type: 'string',
  maxLength: 20,
  minLength: 4,
});

export const emailField = (email: string): IValidateItem => ({
  value: email,
  name: 'email',
  type: 'string',
  pattern: /^\w+@\w+\.\w+/,
  maxLength: 100,
  minLength: 3,
});

export const passwordField = (password: string): IValidateItem => ({
  value: password,
  name: 'password',
  required: true,
  type: 'string',
  minLength: 4,
  maxLength: 100,
});

export const profileTypeField = (profileType: string): IValidateItem => ({
  value: profileType,
  name: 'profileType',
  type: 'string',
  pattern: /(client|master)/,
});
