import { convertCompilerOptionsFromJson } from 'typescript';
import ValidationError from '../../errors/validation.error';
import IError, { IErrorItem } from '../../interfaces/error.interface';

interface IValidateItem {
  value: any;
  name: string;
  required?: boolean;
  type?: any;
  pattern?: RegExp;
  maxValue?: number;
  minValue?: number;
  maxLength?: number;
  minLength?: number;
}

interface IValidationTypes {
  all?: Array<IValidateItem>;
  atLeastOne?: Array<IValidateItem>;
}

function setErrorDetails(errorDetails: IErrorItem[] = [], localError: any) {
  errorDetails.push(localError as IErrorItem);
}

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

function checkMaxLength(toCheck: IValidateItem, callback: (error: IErrorItem) => void) {
  if (toCheck?.maxLength) {
    if (toCheck.value > toCheck.maxLength) {
      callback({
        field: toCheck.name,
        details: `${toCheck.name} expected to be shorter than ${toCheck.maxLength}`,
      });
    }
  }
}

function checkMinLength(toCheck: IValidateItem, callback: (error: IErrorItem) => void) {
  if (toCheck?.minLength) {
    if (toCheck.value < toCheck.minLength) {
      callback({
        field: toCheck.name,
        details: `${toCheck.name} expected to be longer than ${toCheck.minLength}`,
      });
    }
  }
}

function checkMaxValue(toCheck: IValidateItem, callback: (error: IErrorItem) => void) {
  if (toCheck?.maxValue) {
    if (toCheck.value > toCheck.maxValue) {
      callback({
        field: toCheck.name,
        details: `${toCheck.name} expected to be less than ${toCheck.maxValue}`,
      });
    }
  }
}

function checkMinValue(toCheck: IValidateItem, callback: (error: IErrorItem) => void) {
  if (toCheck?.minValue) {
    if (toCheck.value < toCheck.minValue) {
      callback({
        field: toCheck.name,
        details: `${toCheck.name} expected to be more than ${toCheck.minValue}`,
      });
    }
  }
}

function validateAtLeastOne(atLeastOne: Array<IValidateItem>) {
  let existsError: boolean = true;
  let typeError: boolean = false;
  let lengthError: boolean = false;
  let sizeError: boolean = false;
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

    // Check length
    checkMaxLength(i, (error: IErrorItem) => {
      lengthError = true;
      setErrorDetails(errorDetails, error);
    });

    checkMinLength(i, (error: IErrorItem) => {
      lengthError = true;
      setErrorDetails(errorDetails, error);
    });

    // Check size
    checkMaxValue(i, (error: IErrorItem) => {
      sizeError = true;
      setErrorDetails(errorDetails, error);
    });

    checkMinValue(i, (error: IErrorItem) => {
      sizeError = true;
      setErrorDetails(errorDetails, error);
    });
  }

  if (existsError || typeError || sizeError) {
    throw ValidationError.AllRequired('Validation error', {
      error: {
        message: 'validation error',
        details: errorDetails,
      },
    });
  }
}

export default (toValidate: IValidationTypes) => {
  console.log(123);
  // I if (toValidate?.all) {
  //   validateAll(toValidate.all);
  // }

  // if (toValidate?.atLeastOne) {
  //   validateAtLeastOne(toValidate.atLeastOne);
  // }
};
