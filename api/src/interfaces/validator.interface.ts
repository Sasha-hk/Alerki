export interface IValidateItem {
  value: any;
  name: string;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
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

export default IValidationTypes;
