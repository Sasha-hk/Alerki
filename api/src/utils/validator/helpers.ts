import IError, { IErrorItem } from '../../interfaces/error.interface';
import IValidationTypes, { IValidateItem } from '../../interfaces/validator.interface';

export function setErrorDetails(errorDetails: IErrorItem[] = [], localError: any) {
  errorDetails.push(localError as IErrorItem);
}
