import { Generic } from './interfaces';

const dataTypes: { [key: string]: any } = {
  number: 10,
  string: 'string',
  boolean: true,
  null: null,
  undefined,
  object: {},
  array: [],
  date: new Date(),
};

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

const typeGeneric: Generic = function (type: string, revert: boolean = false) {
  if (revert) {
    const dataTypesKeys = Object.keys(dataTypes);
    let resultType: any = dataTypes[dataTypesKeys[randInt(0, dataTypesKeys.length)]];

    while (resultType === type) {
      resultType = dataTypes[dataTypesKeys[randInt(0, dataTypesKeys.length)]];
    }

    return resultType;
  }

  return dataTypes[type];
};

const patternGeneric: Generic = function (...params: any) {
  return 0;
};

const requiredGeneric: Generic = function (...params: any) {
  return 0;
};

const minValueGeneric: Generic = function (...params: any) {
  return 0;
};

const maxValueGeneric: Generic = function (...params: any) {
  return 0;
};

const minLengthGeneric: Generic = function (...params: any) {
  return 0;
};

const maxLengthGeneric: Generic = function (...params: any) {
  return 0;
};

export default {
  type: typeGeneric,
  pattern: patternGeneric,
  required: requiredGeneric,
  minLength: minLengthGeneric,
  maxLength: maxLengthGeneric,
  minValue: minValueGeneric,
  maxValue: maxValueGeneric,
};
