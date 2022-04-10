import Validator from '../../utils/validator';
import ValidationError from '../../errors/validation.error';
import IError from '../../interfaces/error.interface';
import IValidateFields, { IValidateField } from '../../utils/validator/validator.interface';
import * as blanks from './../../utils/validator/blanks';

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
  it('should throw ValidationError due to undefined value', () => {
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

  it('should throw ValidationError due to few undefined values', () => {
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
  it('should throw ValidationError due to two value not exists', () => {
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

  it('should throw ValidationError due to two value exists', () => {
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
  it('should throw ValidationError dut to not exists any value', () => {
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

  it('should not throw ValidationError with one undefined field', () => {
    validator.validate(
      {
        picture: {
          value: undefined,
          atLeastOne: true,
        },
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

    validator.validate(
      {
        username: {
          value: 'username',
          atLeastOne: true,
        },
        picture: {
          value: undefined,
          atLeastOne: true,
        },
        email: {
          value: 'email',
          atLeastOne: true,
        },
      },
    );

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
        picture: {
          value: undefined,
          atLeastOne: true,
        },
      },
    );
  });
});

describe('Test required property', () => {
  it('should throw ValidationError due to not specified value', () => {
    wrapValidationError(
      {
        username: {
          value: undefined,
          required: true,
        },
        email: {
          value: undefined,
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

  it('should not throw ValidationError', () => {
    validator.validate(
      {
        username: {
          value: 'username',
          required: true,
        },
        email: {
          value: 'email',
          required: true,
        },
      },
    );
  });
});

describe('Test type property', () => {
  it('should throw ValidationError due to incorrect data type', () => {
    wrapValidationError(
      {
        username: {
          value: 123,
          type: 'string',
        },
        email: {
          value: undefined,
          type: 'string',
        },
      },
      (e: IError | any) => {
        expect(e?.status).toEqual(400);
        expect(e?.error).toMatchObject({
          error: {
            message: 'validation error',
            details: {
              username: 'expected to be a string',
              email: 'expected to be a string',
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
          type: 'string',
        },
        email: {
          value: 'email',
          type: 'string',
        },
        password: {
          value: 1234,
          type: 'number',
        },
        active: {
          value: true,
          type: 'boolean',
        },
      },
    );
  });
});

describe('Test template property', () => {
  it('should throw ValidationError due to not matched value', () => {
    wrapValidationError(
      {
        username: {
          value: 'username',
          type: 'string',
          pattern: /]w+/,
        },
        email: {
          value: 'not email pattern',
          type: 'string',
          pattern: /\w+@\w+.\w+/,
        },
      },
      (e: IError | any) => {
        expect(e?.status).toEqual(400);
        expect(e?.error).toMatchObject({
          error: {
            message: 'validation error',
            details: {
              email: 'does not match pattern',
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
          type: 'string',
          pattern: /\w+/,
        },
        email: {
          value: 'email@gmail.com',
          type: 'string',
          pattern: /\w+@\w+.\w+/,
        },
        password: {
          value: 1234,
          type: 'number',
          pattern: /\d+/,
        },
      },
    );
  });
});

describe('Test value size property', () => {
  it('should throw ValidationError due to too less value', () => {
    wrapValidationError(
      {
        age: {
          value: 14,
          type: 'number',
          minValue: 18,
          maxValue: 60,
        },
        otherAge: {
          value: 90,
          type: 'number',
          minValue: 18,
          maxValue: 60,
        },
      },
      (e: IError | any) => {
        expect(e?.status).toEqual(400);
        expect(e?.error).toMatchObject({
          error: {
            message: 'validation error',
            details: {
              age: 'expected value to be more than 18',
              otherAge: 'expected value to be less than 60',
            },
          },
        });
      },
    );
  });

  it('should not throw ValidationError', () => {
    validator.validate(
      {
        age: {
          value: 18,
          pattern: /\w+/,
          minValue: 18,
          maxValue: 60,
        },
        otherAge: {
          value: 40,
          type: 'number',
          pattern: /\d+/,
          minValue: 0,
        },
      },
    );
  });
});

describe('Test length property', () => {
  it('should throw ValidationError due to too less value', () => {
    wrapValidationError(
      {
        username: {
          value: 'man',
          type: 'string',
          pattern: /\w+/,
          minLength: 4,
          maxLength: 20,
        },
        email: {
          value: '0022222222222222@gmail.com',
          type: 'string',
          pattern: /\w+@\w+.\w+/,
          minLength: 4,
          maxLength: 10,
        },
      },
      (e: IError | any) => {
        expect(e?.status).toEqual(400);
        expect(e?.error).toMatchObject({
          error: {
            message: 'validation error',
            details: {
              email: 'expected value to be shorter than 10 characters',
              username: 'expected value to be longer than 4 characters',
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
          type: 'string',
          pattern: /\w+/,
          minLength: 4,
          maxLength: 20,
        },
        email: {
          value: 'email@gmail.com',
          type: 'string',
          pattern: /\w+@\w+.\w+/,
          minLength: 4,
          maxLength: 319,
        },
        password: {
          value: 1234,
          type: 'number',
          pattern: /\d+/,
          minLength: 4,
          maxLength: 30,
        },
      },
    );
  });
});

describe('Test blanks', () => {
  describe('test username blank', () => {
    it('should throw ValidationError due bad data type', () => {
      wrapValidationError(
        {
          ...blanks.usernameField(123),
        },
        (e: IError | any) => {
          expect(e?.status).toEqual(400);
          expect(e?.error).toMatchObject({
            error: {
              message: 'validation error',
              details: {
                username: 'expected to be a string',
              },
            },
          });
        },
      );
    });

    it('should throw ValidationError due not does not match pattern value', () => {
      wrapValidationError(
        {
          ...blanks.usernameField('user name'),
        },
        (e: IError | any) => {
          expect(e?.status).toEqual(400);
          expect(e?.error).toMatchObject({
            error: {
              message: 'validation error',
              details: {
                username: 'does not match pattern',
              },
            },
          });
        },
      );
    });

    it('should throw ValidationError due to too long value', () => {
      wrapValidationError(
        {
          ...blanks.usernameField('too_long_username_too_long_username'),
        },
        (e: IError | any) => {
          expect(e?.status).toEqual(400);
          expect(e?.error).toMatchObject({
            error: {
              message: 'validation error',
              details: {
                username: 'expected value to be shorter than 20 characters',
              },
            },
          });
        },
      );
    });

    it('should throw ValidationError due bad data type', () => {
      wrapValidationError(
        {
          ...blanks.usernameField('x'),
        },
        (e: IError | any) => {
          expect(e?.status).toEqual(400);
          expect(e?.error).toMatchObject({
            error: {
              message: 'validation error',
              details: {
                username: 'expected value to be longer than 4 characters',
              },
            },
          });
        },
      );
    });

    it('should not throw ValidationError', () => {
      validator.validate(
        {
          ...blanks.usernameField('good_username'),
        },
      );
    });
  });

  describe('test email blank', () => {
    it('should throw ValidationError due not does not match pattern value', () => {
      wrapValidationError(
        {
          ...blanks.emailField('not email value'),
        },
        (e: IError | any) => {
          expect(e?.status).toEqual(400);
          expect(e?.error).toMatchObject({
            error: {
              message: 'validation error',
              details: {
                email: 'does not match pattern',
              },
            },
          });
        },
      );
    });

    it('should not throw ValidationError', () => {
      validator.validate(
        {
          ...blanks.emailField('goog@email.com'),
        },
      );
    });
  });

  describe('test password blank', () => {
    it('should throw ValidationError due not does not match pattern value', () => {
      wrapValidationError(
        {
          ...blanks.passwordField(123),
        },
        (e: IError | any) => {
          expect(e?.status).toEqual(400);
          expect(e?.error).toMatchObject({
            error: {
              message: 'validation error',
              details: {
                password: 'expected to be a string',
              },
            },
          });
        },
      );
    });

    it('should not throw ValidationError', () => {
      validator.validate(
        {
          ...blanks.passwordField('asfjk40123jkl*&#(#'),
        },
      );
    });
  });

  describe('test profileType blank', () => {
    it('should throw ValidationError due not does not match pattern value', () => {
      wrapValidationError(
        {
          ...blanks.profileTypeField('not profile type'),
        },
        (e: IError | any) => {
          expect(e?.status).toEqual(400);
          expect(e?.error).toMatchObject({
            error: {
              message: 'validation error',
              details: {
                profileType: 'does not match pattern',
              },
            },
          });
        },
      );
    });

    it('should not throw ValidationError', () => {
      validator.validate(
        {
          ...blanks.profileTypeField('client'),
        },
      );
    });

    it('should not throw ValidationError', () => {
      validator.validate(
        {
          ...blanks.profileTypeField('master'),
        },
      );
    });
  });
});
