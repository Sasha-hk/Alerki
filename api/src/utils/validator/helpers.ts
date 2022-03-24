import { IErrorItem } from '../../interfaces/error.interface';

/**
 * Set error details
 * @param {IErrorItem[]} errorDetails Error details
 * @param {any} localError Error to push to the error details
 */
export function setErrorDetails(errorDetails: IErrorItem[] = [], localError: any) {
  errorDetails.push(localError as IErrorItem);
}
