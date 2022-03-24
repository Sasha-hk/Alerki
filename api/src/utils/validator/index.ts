import ValidationError from '../../errors/validation.error';
import { IErrorItem } from '../../interfaces/error.interface';
import IValidationTypes, { IValidateItem } from '../../interfaces/validator.interface';
import { checkLengthAndValue, checkExists, checkType } from './checks';

function validateAll(all: Array<IValidateItem>) {
  let existsError: boolean = false;
  let typeError: boolean = false;
  let lengthAndValueError: boolean = false;
  const errorDetails: IErrorItem[] = [];

  for (const i of all) {
    if (checkExists(i, errorDetails)) {
      existsError = true;
      break;
    }

    if (checkType(i, errorDetails)) {
      typeError = true;
      break;
    }

    if (checkLengthAndValue(i, errorDetails)) {
      console.log(1);
      lengthAndValueError = true;
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

function validateAtLeastOne(atLeastOne: Array<IValidateItem>) {
  let existsError: boolean = true;
  let typeError: boolean = false;
  let lengthAndValueError: boolean = false;
  const errorDetails: IErrorItem[] = [];

  for (const i of atLeastOne) {
    if (checkExists(i, errorDetails, 'atLeastOne')) {
      existsError = false;
      break;
    }

    if (checkType(i, errorDetails)) {
      typeError = true;
      break;
    }

    if (checkLengthAndValue(i, errorDetails)) {
      lengthAndValueError = false;
      break;
    }
  }

  if (!existsError || typeError || lengthAndValueError) {
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
