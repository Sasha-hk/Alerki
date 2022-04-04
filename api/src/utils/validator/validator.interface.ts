export interface IValidateProperties {
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

export interface IValidateField extends IValidateProperties {
  value: any;
}

interface IValidateFields {
  [key: string]: IValidateField;
}

export default IValidateFields;
