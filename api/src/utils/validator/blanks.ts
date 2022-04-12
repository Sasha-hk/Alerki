import IValidateFields, { IValidateProperties } from './validator.interface';

export const usernameField = (username: string | any, options?: IValidateProperties): IValidateFields => ({
  username: {
    value: username,
    type: 'string',
    pattern: /^\w+$/,
    minLength: 4,
    maxLength: 20,
    ...options,
  },
});

export const firstNameField = (firstName: string | any, options?: IValidateProperties): IValidateFields => ({
  firstName: {
    value: firstName,
    type: 'string',
    pattern: /^\w+$/,
    minLength: 4,
    maxLength: 25,
    ...options,
  },
});

export const lastNameField = (lastName: string | any, options?: IValidateProperties): IValidateFields => ({
  lastName: {
    value: lastName,
    type: 'string',
    pattern: /^\w+$/,
    minLength: 4,
    maxLength: 25,
    ...options,
  },
});

export const emailField = (email: string | any, options?: IValidateProperties): IValidateFields => ({
  email: {
    value: email,
    type: 'string',
    pattern: /^\w+@\w+\.\w+/,
    minLength: 4,
    maxLength: 319,
    ...options,
  },
});

export const passwordField = (password: string | any, options?: IValidateProperties): IValidateFields => ({
  password: {
    value: password,
    type: 'string',
    minLength: 4,
    maxLength: 100,
    ...options,
  },
});

export const profileTypeField = (profileType: string | any, options?: IValidateProperties): IValidateFields => ({
  profileType: {
    value: profileType,
    type: 'string',
    pattern: /(client|master)/,
    ...options,
  },
});

export const phoneNumberField = (phoneNumber: string | any, options?: IValidateProperties): IValidateFields => ({
  phoneNumber: {
    value: phoneNumber,
    type: 'string',
    pattern: /\+[0-9]{2,3}[0-9]{3}[0-9]{3}[0-9]{3}/,
    ...options,
  },
});

export const userPictureField = (userPictureField: string | any, options?: IValidateProperties): IValidateFields => ({
  userPictureField: {
    value: userPictureField,
    type: 'Buffer',
    ...options,
  },
});
