export interface IErrorItem {
  field: string;
  details?: string;
}

export interface IErrorWrapper {
  message?: string;
  details?: Array<IErrorItem> | [];
}

interface IError {
  error: IErrorWrapper | string;
}

export default IError;
