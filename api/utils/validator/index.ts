interface IValidateItem {
  value: any;
  name?: string;
  required?: boolean;
  pattern?: RegExp;
  type?: any;
  max?: number;
  min?: number;
}

interface IValidationTypes {
  all: Array<IValidateItem>;
  atLeastOne: Array<IValidateItem>
}

function validateAll(all: Array<IValidateItem>) {
  for (const i of all) {
    console.log(i);
  }
}

function validateAtLeastOne(atLeastOne: Array<IValidateItem>) {
  for (const i of atLeastOne) {
    console.log(i);
  }
}

export default (toValidate: IValidationTypes) => {
  if (toValidate?.all) {
    validateAll(toValidate.all);
  }

  if (toValidate?.atLeastOne) {
    validateAtLeastOne(toValidate.all);
  }
};
