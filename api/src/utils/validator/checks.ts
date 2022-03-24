import IError, { IErrorItem } from '../../interfaces/error.interface';
import IValidationTypes, { IValidateItem } from '../../interfaces/validator.interface';
import { setErrorDetails } from './helpers';

export function checkMaxLength(toCheck: IValidateItem, callback: (error: IErrorItem) => void) {
  if (toCheck?.maxLength) {
    if (toCheck.value > toCheck.maxLength) {
      callback({
        field: toCheck.name,
        details: `${toCheck.name} expected to be shorter than ${toCheck.maxLength}`,
      });
    }
  }
}

export function checkMinLength(toCheck: IValidateItem, callback: (error: IErrorItem) => void) {
  if (toCheck?.minLength) {
    if (toCheck.value < toCheck.minLength) {
      callback({
        field: toCheck.name,
        details: `${toCheck.name} expected to be longer than ${toCheck.minLength}`,
      });
    }
  }
}

export function checkMaxValue(toCheck: IValidateItem, callback: (error: IErrorItem) => void) {
  if (toCheck?.maxValue) {
    if (toCheck.value > toCheck.maxValue) {
      callback({
        field: toCheck.name,
        details: `${toCheck.name} expected to be less than ${toCheck.maxValue}`,
      });
    }
  }
}

export function checkMinValue(toCheck: IValidateItem, callback: (error: IErrorItem) => void) {
  if (toCheck?.minValue) {
    if (toCheck.value < toCheck.minValue) {
      callback({
        field: toCheck.name,
        details: `${toCheck.name} expected to be more than ${toCheck.minValue}`,
      });
    }
  }
}

export function checkLengthAndValue(
  toCheck: IValidateItem,
  errorDetails: IErrorItem[],
): boolean {
  let localError: boolean = false;

  // Check length
  checkMaxLength(toCheck, (error: IErrorItem) => {
    localError = true;
    setErrorDetails(errorDetails, error);
  });

  checkMinLength(toCheck, (error: IErrorItem) => {
    localError = true;
    setErrorDetails(errorDetails, error);
  });

  // Check size
  checkMaxValue(toCheck, (error: IErrorItem) => {
    localError = true;
    setErrorDetails(errorDetails, error);
  });

  checkMinValue(toCheck, (error: IErrorItem) => {
    localError = true;
    setErrorDetails(errorDetails, error);
  });

  return localError;
}
