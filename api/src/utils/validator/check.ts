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

const type: PartialCheck = (field: IValidateField, errorPool: IErrorPool, name: string) => {
  if (field?.type) {
    if (field.required) {
      if (typeof field.value !== field.type) {
        setError(errorPool, name, `expected to be a ${field.type}`);
        return true;
      }
    } else if (field.value !== undefined) {
      if (typeof field.value !== field.type) {
        if (field.atLeastOne || field.onlyOne) {
          setError(errorPool, name, `expected to be a ${field.type}`);
          return true;
        }
      }
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
  let beforeExists = false;
  let notExists = false;

  for (let i = 0; i < keysLength; i++) {
    if (fields[keys[i]]?.atLeastOne) {
      if (!fields[keys[i]]?.value) {
        notExists = true;
        localError[keys[i]] = 'is required at least one';
        continue;
      }

      beforeExists = true;
    }
  }

  if (!beforeExists && notExists) {
    Object.assign(errorPool, localError);
    return true;
  }

  return false;
};

const pattern: PartialCheck = (field: IValidateField, errorPool: IErrorPool, name: string) => {
  if (field?.pattern) {
    if (field.required) {
      if (!RegExp(field.pattern).test(field.value)) {
        setError(errorPool, name, 'does not match pattern');
        return true;
      }
    } else if (field.value !== undefined) {
      if (field.atLeastOne || field.onlyOne) {
        if (!RegExp(field.pattern).test(field.value)) {
          setError(errorPool, name, 'does not match pattern');
          return true;
        }
      }
    }
  }

  return false;
};

const minValue: PartialCheck = (field: IValidateField, errorPool: IErrorPool, name: string) => {
  if (field?.minValue) {
    if (field.value < field.minValue) {
      setError(errorPool, name, `expected value to be more than ${field.minValue}`);
      return true;
    }
  }

  return false;
};

const maxValue: PartialCheck = (field: IValidateField, errorPool: IErrorPool, name: string) => {
  if (field?.maxValue) {
    if (field.value > field.maxValue) {
      setError(errorPool, name, `expected value to be less than ${field.maxValue}`);
      return true;
    }
  }

  return false;
};

const minLength: PartialCheck = (field: IValidateField, errorPool: IErrorPool, name: string) => {
  if (field?.minLength) {
    if (field?.value?.length < field.minLength) {
      setError(errorPool, name, `expected value to be longer than ${field.minLength} characters`);
      return true;
    }
  }

  return false;
};

const maxLength: PartialCheck = (field: IValidateField, errorPool: IErrorPool, name: string) => {
  if (field?.maxLength) {
    if (field?.value?.length > field.maxLength) {
      setError(errorPool, name, `expected value to be shorter than ${field.maxLength} characters`);
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
    minValue,
    maxValue,
    minLength,
    maxLength,
  },
  fullChecks: {
    onlyOne,
    atLeastOne,
  },
};
