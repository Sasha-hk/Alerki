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
    validator.validate(parameters);

    throw new Error('Expected ValidationError');
  } catch (e: IError | any) {
    expect(e).toBeInstanceOf(ValidationError);
    callback(e);
  }
}

describe('Test required property', () => {
  it('should throw ValidationError when value is undefined', () => {
    wrapValidationError(
      {
        username: {
          value: undefined,
          required: true,
        },
      },
      (e: IError | any) => {
        expect(e?.status).toEqual(400);
        expect(e?.error).toMatchObject({
          error: {
            message: 'validation error',
            details: {
              username: 'is required',
            },
          },
        });
      },
    );
  });

  it('should throw ValidationError when pass few undefined values', () => {
    wrapValidationError(
      {
        username: {
          value: undefined,
          required: true,
        },
        email: {
          value: undefined,
          required: true,
        },
      },
      (e: IError | any) => {
        expect(e?.status).toEqual(400);
        expect(e?.error).toMatchObject({
          error: {
            message: 'validation error',
            details: {
              username: 'is required',
              email: 'is required',
            },
          },
        });
      },
    );
  });

  it('should not throw ValidationError', () => {
    validator.validate({
      username: {
        value: 'exists value',
        required: true,
      },
      email: {
        value: undefined,
      },
    });
  });

  it('should not throw ValidationError', () => {
    validator.validate({
      username: {
        value: 'exists value',
        required: true,
      },
    });
  });
});

describe('Test onlyOne property', () => {
  it('should throw ValidationError when two value not exists', () => {
    wrapValidationError(
      {
        username: {
          value: undefined,
          onlyOne: true,
        },
        email: {
          value: undefined,
          onlyOne: true,
        },
      },
      (e: IError | any) => {
        expect(e?.status).toEqual(400);
        expect(e?.error).toMatchObject({
          error: {
            message: 'validation error',
            details: {
              username: 'is required or another one',
              email: 'is required or another one',
            },
          },
        });
      },
    );
  });

  it('should throw ValidationError when two value exists', () => {
    wrapValidationError(
      {
        username: {
          value: 'hello',
          onlyOne: true,
        },
        email: {
          value: 'email',
          onlyOne: true,
        },
      },
      (e: IError | any) => {
        expect(e?.status).toEqual(400);
        expect(e?.error).toMatchObject({
          error: {
            message: 'validation error',
            details: {
              username: 'required only one',
              email: 'required only one',
            },
          },
        });
      },
    );
  });

  it('should not throw ValidationError', () => {
    validator.validate(
      {
        username: {
          value: 'hello',
          onlyOne: true,
        },
        email: {
          value: undefined,
          onlyOne: true,
        },
      },
    );
  });

  it('should not throw ValidationError', () => {
    validator.validate(
      {
        username: {
          value: false,
          onlyOne: true,
        },
        email: {
          value: 'email',
          onlyOne: true,
        },
      },
    );
  });
});

describe('Test atLestOne property', () => {
  it('should throw ValidationError not exists any value', () => {
    wrapValidationError(
      {
        username: {
          value: undefined,
          atLeastOne: true,
        },
        email: {
          value: undefined,
          atLeastOne: true,
        },
      },
      (e: IError | any) => {
        expect(e?.status).toEqual(400);
        expect(e?.error).toMatchObject({
          error: {
            message: 'validation error',
            details: {
              username: 'is required at least one',
              email: 'is required at least one',
            },
          },
        });
      },
    );
  });

  it('should not throw ValidationError', () => {
    validator.validate(
      {
        username: {
          value: 'username',
          atLeastOne: true,
        },
        email: {
          value: 'email',
          atLeastOne: true,
        },
      },
    );
  });
});
