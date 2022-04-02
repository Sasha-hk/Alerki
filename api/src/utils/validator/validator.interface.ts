export interface IValidateField {
  value: any;
  required?: boolean;
  onlyOne?: boolean;
  atLeastOne?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'Buffer';
  pattern?: RegExp;
  maxValue?: number;
  minValue?: number;
  maxLength?: number;
  minLength?: number;
}

interface IValidateFields {
  [key: string]: IValidateField;
}

export default IValidateFields;
