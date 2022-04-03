import ValidationError from '../../errors/validation.error';
import IValidateFields, { IValidateField } from './validator.interface';
import { IErrorPool } from './index';

export interface PartialCheck {
  (field: IValidateField, name: string): object | void;
}

export interface FullCheck {
  (field: IValidateFields): object | void;
}

interface IErrorField {
  [key: string]: string;
}

function genError(name: string, message: string) {
  const error: IErrorField = {};
  error[name] = message;

  return error;
}

const required: PartialCheck = (field: IValidateField, name: string) => {
  if (field?.required) {
    if (!field?.value) {
      return genError(name, 'is required');
    }
  }
};

const onlyOne: FullCheck = (fields: IValidateFields) => {
  const keys = Object.keys(fields);
  const keysLength = keys.length;
  const errorPool: IErrorPool = {};
  let oneExists = false;

  for (let i = 0; i < keysLength; i++) {
    if (fields[keys[i]]?.onlyOne) {
      if (fields[keys[i]]?.value && oneExists) {
        errorPool[keys[i]] = 'required only one';
      } else {
        oneExists = true;
      }
    }
  }

  if (oneExists) {
    return errorPool;
  }
};

const atLeastOne: FullCheck = (fields: IValidateFields) => {
  const keys = Object.keys(fields);
  const keysLength = keys.length;
  const errorPool: IErrorPool = {};
  let atLeastOneExists = false;

  for (let i = 0; i < keysLength; i++) {
    if (fields[keys[i]]?.atLeastOne) {
      if (fields[keys[i]]?.value) {
        atLeastOneExists = true;
      } else {
        errorPool[keys[i]] = 'is required or another one';
      }
    }
  }

  if (!atLeastOneExists) {
    return errorPool;
  }
};

const type: PartialCheck = (field: IValidateField, name: string) => {
  const errorPool: IErrorPool = {};

  if (field?.type) {
    if (typeof field.value !== field.type) {
      errorPool[name] = `expected ${name} to be ${field.type}`;
      return errorPool;
    }
  }
};

const pattern: PartialCheck = (field: IValidateField, name: string) => {
  const errorPool: IErrorPool = {};

  if (field?.pattern) {
    if (!RegExp(field.pattern).test(field.value)) {
      errorPool[name] = 'does not match pattern';
      return errorPool;
    }
  }
};

const valueSize: PartialCheck = (field: IValidateField, name: string) => {
  const errorPool: IErrorPool = {};

  if (field?.minValue) {
    if (field.value < field.minValue) {
      errorPool[name] = `expected to be more than ${field.minLength}`;
      return errorPool;
    }
  }

  if (field?.maxValue) {
    if (field.value > field.maxValue) {
      errorPool[name] = `expected to be less than ${field.minLength}`;
      return errorPool;
    }
  }
};

const length: PartialCheck = (field: IValidateField, name: string) => {
  const errorPool: IErrorPool = {};

  if (field?.minLength) {
    if (field.value.length < field.minLength) {
      errorPool[name] = `expected to be longer than ${field.minLength}`;
      return errorPool;
    }
  }

  if (field?.maxLength) {
    if (field.value.length > field.maxLength) {
      errorPool[name] = `expected to be shorter than ${field.minLength}`;
      return errorPool;
    }
  }
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
