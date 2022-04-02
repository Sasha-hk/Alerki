import Validator from '../../utils/validator';
import ValidationError from '../../errors/validation.error';
import IError from '../../interfaces/error.interface';
import IValidateFields, { IValidateField } from '../../utils/validator/validator.interface';

const validator = new Validator();

function wrapValidationError(
  parameters: IValidateFields,
  callback: (e: IError | any) => void,
) {
  try {
    const check = validator.validate(parameters);

    expect(check).toBeFalsy();
  } catch (e: IError | any) {
    expect(e).toBeInstanceOf(ValidationError);
    callback(e);
  }
}

describe('Test required property', () => {
  it('should throw error', () => {
    wrapValidationError(
      {
        username: {
          value: undefined,
          required: true,
        },
        email: {
          value: 'email',
          required: true,
        },
      },
      (e: IError | any) => {
        console.log(e);
      },
    );
  });
});
