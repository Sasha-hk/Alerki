import IValidateFields from './validator.interface';

export const usernameField = (username: string): IValidateFields => ({
  username: {
    value: username,
    type: 'string',
    maxLength: 20,
    minLength: 4,
  },
});

export const emailField = (email: string): IValidateFields => ({
  email: {
    value: email,
    type: 'string',
    pattern: /^\w+@\w+\.\w+/,
    maxLength: 319,
    minLength: 4,
  },
});

export const passwordField = (password: string): IValidateFields => ({
  password: {
    value: password,
    required: true,
    type: 'string',
    minLength: 4,
    maxLength: 100,
  },
});

export const profileTypeField = (profileType: string): IValidateFields => ({
  profileType: {
    value: profileType,
    type: 'string',
    pattern: /(client|master)/,
  },
});
