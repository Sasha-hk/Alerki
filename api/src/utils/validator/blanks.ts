import IValidateFields from './validator.interface';

export const usernameField = (username: string | any, options?: object): IValidateFields => ({
  username: {
    value: username,
    type: 'string',
    pattern: /^\w+$/,
    minLength: 4,
    maxLength: 20,
    ...options,
  },
});

export const emailField = (email: string | any, options?: object): IValidateFields => ({
  email: {
    value: email,
    type: 'string',
    pattern: /^\w+@\w+\.\w+/,
    minLength: 4,
    maxLength: 319,
    ...options,
  },
});

export const passwordField = (password: string | any, options?: object): IValidateFields => ({
  password: {
    value: password,
    type: 'string',
    minLength: 4,
    maxLength: 100,
    ...options,
  },
});

export const profileTypeField = (profileType: string | any, options?: object): IValidateFields => ({
  profileType: {
    value: profileType,
    type: 'string',
    pattern: /(client|master)/,
    ...options,
  },
});
