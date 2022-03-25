import ValidationError from '../../errors/validation.error';
import { IErrorItem } from '../../interfaces/error.interface';
import IValidationTypes, { IValidateItem } from '../../interfaces/validator.interface';
import {
  checkExists,
  checkRequired,
  checkType,
  checkPattern,
  checkLengthAndValue,
} from './checks';

function validateAll(all: Array<IValidateItem>) {
  let existsError: boolean = false;
  let requiredError: boolean = false;
  let typeError: boolean = false;
  let lengthAndValueError: boolean = false;
  let patternError:boolean = false;
  const errorDetails: IErrorItem[] = [];

  for (const i of all) {
    if (checkExists(i, errorDetails)) {
      existsError = true;
      continue;
    }

    if (checkRequired(i, errorDetails)) {
      requiredError = true;
      continue;
    }

    if (checkType(i, errorDetails)) {
      typeError = true;
      continue;
    }

    if (checkPattern(i, errorDetails)) {
      patternError = true;
      continue;
    }

    if (checkLengthAndValue(i, errorDetails)) {
      lengthAndValueError = true;
      continue;
    }
  }

  if (existsError || typeError || lengthAndValueError || patternError || requiredError) {
    throw ValidationError.AllRequired('Validation error', {
      error: {
        message: 'validation error',
        details: errorDetails,
      },
    });
  }
}

function validateAtLeastOne(atLeastOne: Array<IValidateItem>) {
  let beforeExists: boolean = false;
  let existsError: boolean = false;
  let requiredError: boolean = false;
  let typeError: boolean = false;
  let lengthAndValueError: boolean = false;
  let patternError: boolean = false;
  let errorDetails: IErrorItem[] = [];
  const existsErrorDetails: IErrorItem[] = [];
  const requiredErrorDetails: IErrorItem[] = [];

  for (const i of atLeastOne) {
    if (checkRequired(i, requiredErrorDetails)) {
      requiredError = true;
      continue;
    } else {
      beforeExists = true;
    }

    if (checkExists(i, existsErrorDetails, 'atLeastOne')) {
      existsError = true;
      continue;
    }

    if (checkType(i, errorDetails)) {
      typeError = true;
      continue;
    }

    if (checkPattern(i, errorDetails)) {
      patternError = true;
      continue;
    }

    if (checkLengthAndValue(i, errorDetails)) {
      lengthAndValueError = false;
      continue;
    }
  }

  if (!existsError || typeError || lengthAndValueError || patternError || requiredError) {
    if (requiredError) {
      errorDetails = [
        ...errorDetails,
        ...requiredErrorDetails,
      ];
    }

    if (existsError === true && beforeExists !== true) {
      errorDetails = [
        ...errorDetails,
        ...existsErrorDetails,
      ];
    }

    throw ValidationError.AllRequired('Validation error', {
      error: {
        message: 'validation error',
        details: errorDetails,
      },
    });
  }
}

/**
 * Validate parameters
 * @throws {IError}
 */
export default (toValidate: IValidationTypes) => {
  if (toValidate?.all) {
    validateAll(toValidate.all);
  }

  if (toValidate?.atLeastOne) {
    validateAtLeastOne(toValidate.atLeastOne);
  }
};
