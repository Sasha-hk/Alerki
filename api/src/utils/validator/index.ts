import ValidationError from '../../errors/validation.error';
import { IErrorItem } from '../../interfaces/error.interface';
import IValidationTypes, { IValidateItem } from '../../interfaces/validator.interface';
import { checkLengthAndValue, checkExists, checkType, checkPattern } from './checks';

function validateAll(all: Array<IValidateItem>) {
  let existsError: boolean = false;
  let typeError: boolean = false;
  let lengthAndValueError: boolean = false;
  let patternError:boolean = false;
  const errorDetails: IErrorItem[] = [];

  for (const i of all) {
    if (checkExists(i, errorDetails)) {
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
      lengthAndValueError = true;
      continue;
    }
  }

  if (existsError || typeError || lengthAndValueError || patternError) {
    throw ValidationError.AllRequired('Validation error', {
      error: {
        message: 'validation error',
        details: errorDetails,
      },
    });
  }
}

function validateAtLeastOne(atLeastOne: Array<IValidateItem>) {
  let existsError: boolean = true;
  let typeError: boolean = false;
  let lengthAndValueError: boolean = false;
  let patternError: boolean = false;
  const errorDetails: IErrorItem[] = [];

  for (const i of atLeastOne) {
    if (checkExists(i, errorDetails, 'atLeastOne')) {
      existsError = false;
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

  if (!existsError || typeError || lengthAndValueError || patternError) {
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
