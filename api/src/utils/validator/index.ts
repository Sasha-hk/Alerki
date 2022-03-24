import ValidationError from '../../errors/validation.error';
import IError, { IErrorItem } from '../../interfaces/error.interface';
import IValidationTypes, { IValidateItem } from '../../interfaces/validator.interface';
import { setErrorDetails } from './helpers';
import { checkLengthAndValue, checkExists, checkType } from './checks';

function validateAll(all: Array<IValidateItem>) {
  let throwError: boolean = false;
  const errorDetails: IErrorItem[] = [];

  for (const i of all) {
    // Check for exists
    if (!i.value) {
      throwError = true;

      errorDetails.push({
        field: i.name,
        details: `${i.name} is required`,
      });
    }
  }

  if (throwError) {
    throw ValidationError.AllRequired('All parameters required', {
      error: {
        message: 'all parameters required',
        details: errorDetails,
      },
    });
  }
}

function validateAtLeastOne(atLeastOne: Array<IValidateItem>) {
  let existsError: boolean = true;
  let typeError: boolean = false;
  let lengthAndValueError: boolean = false;
  const errorDetails: IErrorItem[] = [];

  for (const i of atLeastOne) {
    if (checkExists(i, errorDetails)) {
      existsError = false;
      break;
    }

    if (checkType(i, errorDetails)) {
      typeError = true;
      break;
    }

    // Check length and value
    if (checkLengthAndValue(i, errorDetails)) {
      lengthAndValueError = false;
      break;
    }
  }

  if (existsError || typeError || lengthAndValueError) {
    throw ValidationError.AllRequired('Validation error', {
      error: {
        message: 'validation error',
        details: errorDetails,
      },
    });
  }
}

export default (toValidate: IValidationTypes) => {
  if (toValidate?.all) {
    validateAll(toValidate.all);
  }

  if (toValidate?.atLeastOne) {
    validateAtLeastOne(toValidate.atLeastOne);
  }
};
