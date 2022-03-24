import ValidationError from '../../errors/validation.error';
import IError, { IErrorItem } from '../../interfaces/error.interface';
import IValidationTypes, { IValidateItem } from '../../interfaces/validator.interface';
import { setErrorDetails } from './helpers';
import { checkLengthAndValue } from './checks';

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
    // Check for exists and required
    if (i.value) {
      existsError = false;
    } else {
      if (i.required) {
        setErrorDetails(errorDetails, {
          field: i.name,
          details: `${i.name} is required`,
        });

        break;
      }

      setErrorDetails(errorDetails, {
        field: i.name,
        details: `${i.name} is required or another one`,
      });

      break;
    }

    // Check for type
    if (i?.type) {
      if (typeof i.value !== i.type) {
        typeError = true;

        setErrorDetails(errorDetails, {
          field: i.name,
          details: `${i.name} expected to be a ${i.type}`,
        });
      }
    }

    // Check length and value
    lengthAndValueError = checkLengthAndValue(i, errorDetails);

    if (lengthAndValueError) {
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
