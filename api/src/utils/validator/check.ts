import ValidationError from '../../errors/validation.error';
import IValidateFields, { IValidateField } from './validator.interface';
import { IErrorPool } from './index';

export interface PartialCheck {
  (field: IValidateField, errorPool: IErrorPool, name: string): boolean;
}

export interface FullCheck {
  (field: IValidateFields, errorPool: IErrorPool): boolean;
}

interface IErrorField {
  [key: string]: string;
}

function setError(errorPool: IErrorPool, name: string, message: string) {
  const error: IErrorField = {};
  error[name] = message;
  Object.assign(errorPool, error);
}

const required: PartialCheck = (field: IValidateField, errorPool: IErrorPool, name: string) => {
  if (field?.required) {
    if (!field?.value) {
      setError(errorPool, name, 'is required');
      return true;
    }
  }

  return false;
};

const onlyOne: FullCheck = (fields: IValidateFields, errorPool: IErrorPool) => {
  const fieldKeys = Object.keys(fields);
  const fieldKeysLength = fieldKeys.length;
  const notExistsErrorPool: IErrorPool = {};
  const twoExistsErrorPool: IErrorPool = {};
  let oneExists = false;
  let notExistsError = false;
  let twoExistsError = false;

  for (let i = 0; i < fieldKeysLength; i++) {
    if (fields[fieldKeys[i]]?.onlyOne) {
      // Check if value exists
      if (fields[fieldKeys[i]]?.value) {
        if (!oneExists) {
          oneExists = true;
          twoExistsErrorPool[fieldKeys[i]] = 'required only one';
          continue;
        }

        twoExistsError = true;
        twoExistsErrorPool[fieldKeys[i]] = 'required only one';
        continue;
      }

      notExistsError = true;
      notExistsErrorPool[fieldKeys[i]] = 'is required or another one';
    }
  }

  if (!oneExists && notExistsError) {
    Object.assign(errorPool, notExistsErrorPool);
    return true;
  }

  if (twoExistsError) {
    Object.assign(errorPool, twoExistsErrorPool);
    return true;
  }

  return false;
};

const atLeastOne: FullCheck = (fields: IValidateFields, errorPool: IErrorPool) => {
  const keys = Object.keys(fields);
  const keysLength = keys.length;
  const localError: IErrorPool = {};
  let atLeastOneExists = false;

  for (let i = 0; i < keysLength; i++) {
    if (fields[keys[i]]?.atLeastOne) {
      if (!fields[keys[i]]?.value) {
        atLeastOneExists = true;
        localError[keys[i]] = 'is required at least one';
      }
    }
  }

  if (atLeastOneExists) {
    Object.assign(errorPool, localError);
    return true;
  }

  return false;
};

const type: PartialCheck = (field: IValidateField, errorPool: IErrorPool, name: string) => {
  if (field?.type) {
    if (typeof field.value !== field.type) {
      setError(errorPool, name, `expected ${name} to be ${field.type}`);
      return true;
    }
  }

  return false;
};

const pattern: PartialCheck = (field: IValidateField, errorPool: IErrorPool, name: string) => {
  if (field?.pattern) {
    if (!RegExp(field.pattern).test(field.value)) {
      setError(errorPool, name, 'does not match pattern');
      return true;
    }
  }

  return false;
};

const valueSize: PartialCheck = (field: IValidateField, errorPool: IErrorPool, name: string) => {
  if (field?.minValue) {
    if (field.value < field.minValue) {
      setError(errorPool, name, `expected to be more than ${field.minLength}`);
      return true;
    }
  }

  if (field?.maxValue) {
    if (field.value > field.maxValue) {
      setError(errorPool, name, `expected to be less than ${field.minLength}`);
      return true;
    }
  }

  return false;
};

const length: PartialCheck = (field: IValidateField, errorPool: IErrorPool, name: string) => {
  if (field?.minLength) {
    if (field.value.length < field.minLength) {
      setError(errorPool, name, `expected to be longer than ${field.minLength}`);
      return true;
    }
  }

  if (field?.maxLength) {
    if (field.value.length > field.maxLength) {
      setError(errorPool, name, `expected to be shorter than ${field.minLength}`);
      return true;
    }
  }

  return false;
};

export default {
  partialChecks: {
    required,
    type,
    pattern,
    valueSize,
    length,
  },
  fullChecks: {
    onlyOne,
    atLeastOne,
  },
};
