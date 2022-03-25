import { IErrorItem } from '../../interfaces/error.interface';
import { IValidateItem } from '../../interfaces/validator.interface';
import { setErrorDetails } from './helpers';

/**
 * Check if value exists and required
 * @param {IValidateItem} toCheck Check item
 * @param {IErrorItem[]} errorDetails Error details
 * @returns {boolean} It `true` it's validation error
 */
export function checkExists(
  toCheck: IValidateItem,
  errorDetails: IErrorItem[],
  option: 'all' | 'atLeastOne' = 'all',
): boolean {
  if (!toCheck?.value) {
    if (toCheck?.required) {
      setErrorDetails(errorDetails, {
        field: toCheck.name,
        details: `${toCheck.name} is required`,
      });

      return true;
    }

    if (option === 'all') {
      setErrorDetails(errorDetails, {
        field: toCheck.name,
        details: `${toCheck.name} is required`,
      });
    } else if (option === 'atLeastOne') {
      setErrorDetails(errorDetails, {
        field: toCheck.name,
        details: `${toCheck.name} is required or another one`,
      });
    }

    return true;
  }

  return false;
}

/**
 * Check for type matching
 * @param {IValidateItem} toCheck Check item
 * @param {IErrorItem[]} errorDetails Error details
 * @returns {boolean} It `true` it's validation error
 */
export function checkType(
  toCheck: IValidateItem,
  errorDetails: IErrorItem[],
): boolean {
  if (toCheck?.type) {
    if (typeof toCheck.value !== toCheck.type) {
      setErrorDetails(errorDetails, {
        field: toCheck.name,
        details: `${toCheck.name} expected to be a ${toCheck.type}`,
      });

      return true;
    }
  }

  return false;
}

/**
 * Check for pattern matching
 * @param {IValidateItem} toCheck Check item
 * @param {IErrorItem[]} errorDetails Error details
 * @returns {boolean} It `true` it's validation error
 */
export function checkPattern(
  toCheck: IValidateItem,
  errorDetails: IErrorItem[],
): boolean {
  if (toCheck?.pattern) {
    if (!RegExp(toCheck.pattern).test(toCheck.value)) {
      setErrorDetails(errorDetails, {
        field: toCheck.name,
        details: 'does not match pattern',
      });

      return true;
    }
  }

  return false;
}

/**
 * Check for max length
 * @param {IValidateItem} toCheck Check item
 * @param {(error: IErrorItem) => void} callback Callback function
 */
export function checkMaxLength(toCheck: IValidateItem, callback: (error: IErrorItem) => void) {
  if (toCheck?.maxLength) {
    if (toCheck.value.length > toCheck.maxLength) {
      callback({
        field: toCheck.name,
        details: `expected to be shorter than ${toCheck.maxLength}`,
      });
    }
  }
}

/**
 * Check for min length
 * @param {IValidateItem} toCheck Check item
 * @param {(error: IErrorItem) => void} callback Callback function
 */
export function checkMinLength(toCheck: IValidateItem, callback: (error: IErrorItem) => void) {
  if (toCheck?.minLength) {
    if (toCheck.value.length < toCheck.minLength) {
      callback({
        field: toCheck.name,
        details: `expected to be longer than ${toCheck.minLength}`,
      });
    }
  }
}

/**
 * Check for max value
 * @param {IValidateItem} toCheck Check item
 * @param {(error: IErrorItem) => void} callback Callback function
 */
export function checkMaxValue(toCheck: IValidateItem, callback: (error: IErrorItem) => void) {
  if (toCheck?.maxValue) {
    if (toCheck.value > toCheck.maxValue) {
      callback({
        field: toCheck.name,
        details: `expected to be less than ${toCheck.maxValue}`,
      });
    }
  }
}

/**
 * Check min value
 * @param {IValidateItem} toCheck Check item
 * @param {(error: IErrorItem) => void} callback Callback function
 */
export function checkMinValue(toCheck: IValidateItem, callback: (error: IErrorItem) => void) {
  if (toCheck?.minValue) {
    if (toCheck.value < toCheck.minValue) {
      callback({
        field: toCheck.name,
        details: `expected to be more than ${toCheck.minValue}`,
      });
    }
  }
}

/**
 * Check length and value size
 * @param {IValidateItem} toCheck Check item
 * @param {IErrorItem[]} errorDetails Error details
 * @returns {boolean} It `true` it's validation error
 */
export function checkLengthAndValue(
  toCheck: IValidateItem,
  errorDetails: IErrorItem[],
): boolean {
  let localError: boolean = false;

  checkMaxLength(toCheck, (error: IErrorItem) => {
    localError = true;
    setErrorDetails(errorDetails, error);
  });

  checkMinLength(toCheck, (error: IErrorItem) => {
    localError = true;
    setErrorDetails(errorDetails, error);
  });

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
