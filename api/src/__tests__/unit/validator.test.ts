import Validator from '../../utils/validator';
import ValidationError from '../../errors/validation.error';
import IError from '../../interfaces/error.interface';
import IValidateFields from '../../utils/validator/validator.interface';
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
    expect(e.status).toEqual(400);
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
        username: {
          value: 'username',
          type: 'string',
          atLeastOne: true,
        },
        picture: {
          value: undefined,
          type: 'string',
          atLeastOne: true,
        },
        email: {
          value: 'email',
          type: 'string',
          atLeastOne: true,
        },
      },
    );

    validator.validate(
      {
        picture: {
          value: undefined,
          type: 'string',
          atLeastOne: true,
        },
        username: {
          value: 'username',
          type: 'string',
          atLeastOne: true,
        },
        email: {
          value: 'email',
          type: 'string',
          atLeastOne: true,
        },
      },
    );

    validator.validate(
      {
        username: {
          value: 'username',
          type: 'string',
          atLeastOne: true,
        },
        picture: {
          value: undefined,
          type: 'string',
          atLeastOne: true,
        },
        email: {
          value: 'email',
          type: 'string',
          atLeastOne: true,
        },
      },
    );

    validator.validate(
      {
        username: {
          value: 'username',
          type: 'string',
          atLeastOne: true,
        },
        email: {
          value: 'email',
          type: 'string',
          atLeastOne: true,
        },
        picture: {
          value: undefined,
          type: 'string',
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
          required: true,
          type: 'string',
        },
        email: {
          value: undefined,
          required: true,
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
          required: true,
          type: 'string',
        },
        email: {
          value: 'email',
          required: true,
          type: 'string',
        },
        password: {
          value: 1234,
          type: 'number',
        },
        active: {
          value: true,
          required: true,
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
          required: true,
          type: 'string',
          pattern: /]w+/,
        },
        email: {
          value: 'not email pattern',
          required: true,
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
          required: true,
          type: 'string',
          pattern: /\w+/,
        },
        email: {
          value: 'email@gmail.com',
          required: true,
          type: 'string',
          pattern: /\w+@\w+.\w+/,
        },
        password: {
          value: 1234,
          required: true,
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
          required: true,
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
          required: true,
          pattern: /\w+/,
          minValue: 18,
          maxValue: 60,
        },
        otherAge: {
          value: 40,
          required: true,
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
          required: true,
          type: 'string',
          pattern: /\w+/,
          minLength: 4,
          maxLength: 20,
        },
        email: {
          value: '0022222222222222@gmail.com',
          required: true,
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
          required: true,
          type: 'string',
          pattern: /\w+/,
          minLength: 4,
          maxLength: 20,
        },
        email: {
          value: 'email@gmail.com',
          required: true,
          type: 'string',
          pattern: /\w+@\w+.\w+/,
          minLength: 4,
          maxLength: 319,
        },
        password: {
          value: 1234,
          required: true,
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
          ...blanks.usernameField(123, { required: true }),
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
          ...blanks.usernameField('user name', { required: true }),
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
          ...blanks.usernameField('too_long_username_too_long_username', { required: true }),
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
          ...blanks.usernameField('x', { required: true }),
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
          ...blanks.usernameField('good_username', { required: true }),
        },
      );
    });
  });

  describe('test email blank', () => {
    it('should throw ValidationError due not does not match pattern value', () => {
      wrapValidationError(
        {
          ...blanks.emailField('not email value', { required: true }),
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
          ...blanks.emailField('goog@email.com', { required: true }),
        },
      );
    });
  });

  describe('test password blank', () => {
    it('should throw ValidationError due not does not match pattern value', () => {
      wrapValidationError(
        {
          ...blanks.passwordField(123, { required: true }),
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
          ...blanks.passwordField('asfjk40123jkl*&#(#', { required: true }),
        },
      );
    });
  });

  describe('test profileType blank', () => {
    it('should throw ValidationError due not does not match pattern value', () => {
      wrapValidationError(
        {
          ...blanks.profileTypeField('not profile type', { required: true }),
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
          ...blanks.profileTypeField('client', { required: true }),
        },
      );
    });

    it('should not throw ValidationError', () => {
      validator.validate(
        {
          ...blanks.profileTypeField('master', { required: true }),
        },
      );
    });
  });
});

describe('Last complex test', () => {
  describe('with correct values', () => {
    it('should not throw error', () => {
      validator.validate({
        username: {
          value: undefined,
          type: 'string',
          pattern: /\w+/,
          minLength: 4,
          maxLength: 20,
        },
        email: {
          value: 'email@email.com',
          required: true,
          type: 'string',
          pattern: /\w+@\w+.\w/,
          minLength: 5,
          maxLength: 319,
        },
        firstName: {
          value: 'Igor',
          type: 'string',
          pattern: /\w+/,
          minLength: 4,
          maxLength: 30,
        },
      });
    });

    it('should not throw error', () => {
      validator.validate({
        username: {
          value: undefined,
          atLeastOne: true,
          type: 'string',
          pattern: /\w+/,
          minLength: 4,
          maxLength: 20,
        },
        email: {
          value: 'email@email.com',
          atLeastOne: true,
          type: 'string',
          pattern: /\w+@\w+.\w/,
          minLength: 5,
          maxLength: 319,
        },
        firstName: {
          value: 'Igor',
          atLeastOne: true,
          type: 'string',
          pattern: /\w+/,
          minLength: 4,
          maxLength: 30,
        },
      });
    });

    it('should not throw error', () => {
      validator.validate({
        username: {
          value: undefined,
          onlyOne: true,
          type: 'string',
          pattern: /\w+/,
          minLength: 4,
          maxLength: 20,
        },
        email: {
          value: 'email@email.com',
          onlyOne: true,
          type: 'string',
          pattern: /\w+@\w+.\w/,
          minLength: 5,
          maxLength: 319,
        },
        firstName: {
          value: 'Igor',
          required: true,
          type: 'string',
          pattern: /\w+/,
          minLength: 4,
          maxLength: 30,
        },
      });
    });
  });

  describe('with incorrect values', () => {
    it('should not throw error', () => {
      wrapValidationError(
        {
          username: {
            value: undefined,
            type: 'string',
            pattern: /\w+/,
            minLength: 4,
            maxLength: 20,
          },
          email: {
            value: undefined,
            required: true,
            type: 'string',
            pattern: /\w+@\w+.\w/,
            minLength: 5,
            maxLength: 319,
          },
          firstName: {
            value: 'Igor',
            type: 'string',
            pattern: /\w+/,
            minLength: 4,
            maxLength: 30,
          },
        },
        (e: IError | any) => {
          expect(e.status).toEqual(400);
          expect(e.error).toMatchObject(
            {
              error: {
                message: 'validation error',
                details: {
                  email: 'does not match pattern',
                },
              },
            },
          );
        },
      );
    });

    it('should not throw error', () => {
      wrapValidationError(
        {
          username: {
            value: undefined,
            atLeastOne: true,
            type: 'string',
            pattern: /\w+/,
            minLength: 4,
            maxLength: 20,
          },
          email: {
            value: undefined,
            atLeastOne: true,
            type: 'string',
            pattern: /\w+@\w+.\w/,
            minLength: 5,
            maxLength: 319,
          },
          firstName: {
            value: undefined,
            atLeastOne: true,
            type: 'string',
            pattern: /\w+/,
            minLength: 4,
            maxLength: 30,
          },
        },
        (e: IError | any) => {
          expect(e.status).toEqual(400);
          expect(e.error).toMatchObject(
            {
              error: {
                message: 'validation error',
                details: {
                  email: 'is required at least one',
                  firstName: 'is required at least one',
                  username: 'is required at least one',
                },
              },
            },
          );
        },
      );
    });

    it('should not throw error', () => {
      wrapValidationError(
        {
          username: {
            value: undefined,
            onlyOne: true,
            type: 'string',
            pattern: /\w+/,
            minLength: 4,
            maxLength: 20,
          },
          email: {
            value: 'emailemail.com',
            onlyOne: true,
            type: 'string',
            pattern: /\w+@\w+.\w/,
            minLength: 5,
            maxLength: 319,
          },
          firstName: {
            value: 'Igor',
            required: true,
            type: 'string',
            pattern: /\w+/,
            minLength: 4,
            maxLength: 30,
          },
        },
        (e: IError | any) => {
          expect(e.status).toEqual(400);
          expect(e.error).toMatchObject(
            {
              error: {
                message: 'validation error',
                details: {
                  email: 'does not match pattern',
                },
              },
            },
          );
        },
      );
    });
  });

  it('check if type checking works with atLeastOne property', () => {
    wrapValidationError(
      {
        username: {
          value: undefined,
          type: 'string',
          atLeastOne: true,
        },
        email: {
          value: [1, 2, 3],
          type: 'string',
          atLeastOne: true,
        },
      },
      (e: IError | any) => {
        expect(e.error).toMatchObject(
          {
            error: {
              message: 'validation error',
              details: {
                email: 'expected to be a string',
              },
            },
          },
        );
      },
    );
  });

  it('check hard value', () => {
    validator.validate({
      ...blanks.phoneNumberField(undefined, { atLeastOne: true }),
      ...blanks.firstNameField(undefined, { atLeastOne: true }),
      ...blanks.lastNameField(undefined, { atLeastOne: true }),
      picture: {
        value: 'asdf',
        type: 'string',
        atLeastOne: true,
      },
    });
  });
});
