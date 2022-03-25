import Validator from '../../utils/validator';
import ValidationError from '../../errors/validation.error';
import IError from '../../interfaces/error.interface';
import IValidationTypes from '../../interfaces/validator.interface';

const username = 'tom_';
const email = 'example@gmail.com';
const password = 'tom123';
const firstName = 'Tom';

function wrapValidationError(
  parameters: IValidationTypes,
  callback: (e: IError | any) => void,
) {
  try {
    const check = Validator(parameters);

    expect(check).toBeFalsy();
  } catch (e: IError | any) {
    expect(e).toBeInstanceOf(ValidationError);
    callback(e);
  }
}

describe('Check validation types (all|atLeastOne)', () => {
  describe('test all required parameter', () => {
    it('should throw ValidationError all parameters required', () => {
      wrapValidationError(
        {
          all: [
            {
              value: undefined,
              name: 'username',
            },
            {
              value: undefined,
              name: 'email',
            },
          ],
        },
        (e: IError | any) => {
          expect(e?.status).toEqual(400);
          expect(e?.error).toMatchObject({
            error: {
              message: 'validation error',
              details: [
                {
                  field: 'username',
                  details: 'username is required',
                },
                {
                  field: 'email',
                  details: 'email is required',
                },
              ],
            },
          });
        },
      );
    });

    it('should throw ValidationError for two parameters', () => {
      wrapValidationError(
        {
          all: [
            {
              value: username,
              name: 'username',
            },
            {
              value: undefined,
              name: 'firstName',
            },
          ],
        },
        (e: IError | any) => {
          expect(e?.status).toEqual(400);
          expect(e?.error).toMatchObject({
            error: {
              message: 'validation error',
              details: [
                {
                  field: 'firstName',
                  details: 'firstName is required',
                },
              ],
            },
          });
        },
      );
    });

    it('should not throw error', () => {
      Validator({
        all: [
          {
            value: username,
            name: 'username',
          },
          {
            value: email,
            name: 'email',
          },
        ],
      });
    });
  });

  describe('test at least one parameter required', () => {
    it('should throw ValidationError at least one parameter required', () => {
      wrapValidationError(
        {
          atLeastOne: [
            {
              value: undefined,
              name: 'username',
            },
            {
              value: undefined,
              name: 'email',
            },
          ],
        },
        (e: IError | any) => {
          expect(e?.status).toEqual(400);
          expect(e?.error).toMatchObject({
            error: {
              message: 'validation error',
              details: [
                {
                  field: 'username',
                  details: 'username is required or another one',
                },
                {
                  field: 'email',
                  details: 'email is required or another one',
                },
              ],
            },
          });
        },
      );
    });

    it('should not throw error', () => {
      Validator({
        atLeastOne: [
          {
            value: undefined,
            name: 'username',
          },
          {
            value: email,
            name: 'email',
          },
        ],
      });
    });
  });
});

describe('Check type matching', () => {
  it('should throw ValidationError bad types', () => {
    wrapValidationError(
      {
        atLeastOne: [
          {
            value: 1234,
            name: 'username',
            type: 'string',
          },
          {
            value: password,
            name: 'password',
            type: 'string',
          },
        ],
      },
      (e: IError | any) => {
        expect(e?.status).toEqual(400);
        expect(e?.error).toMatchObject({
          error: {
            message: 'validation error',
            details: [
              {
                field: 'username',
                details: 'username expected to be a string',
              },
            ],
          },
        });
      },
    );
  });

  it('should throw ValidationError bad types', () => {
    wrapValidationError(
      {
        atLeastOne: [
          {
            value: undefined,
            name: 'username',
            type: 'string',
          },
          {
            value: 1234,
            name: 'password',
            type: 'string',
          },
        ],
      },
      (e: IError | any) => {
        expect(e?.status).toEqual(400);
        expect(e?.error).toMatchObject({
          error: {
            message: 'validation error',
            details: [
              {
                field: 'password',
                details: 'password expected to be a string',
              },
            ],
          },
        });
      },
    );
  });
});

describe('Check required parameter', () => {
  describe('with check all', () => {
    it('should throw ValidationError', () => {
      wrapValidationError(
        {
          all: [
            {
              value: undefined,
              name: 'username',
              type: 'string',
              required: true,
            },
            {
              value: password,
              name: 'password',
              type: 'string',
            },
          ],
        },
        (e: IError | any) => {
          expect(e?.status).toEqual(400);
          expect(e?.error).toMatchObject({
            error: {
              message: 'validation error',
              details: [
                {
                  field: 'username',
                  details: 'username is required',
                },
              ],
            },
          });
        },
      );
    });

    it('should not throw error', () => {
      Validator({
        all: [
          {
            value: username,
            name: 'username',
            type: 'string',
            required: true,
          },
          {
            value: password,
            name: 'password',
            type: 'string',
            required: true,
          },
        ],
      });
    });
  });

  describe('with at least one', () => {
    it('should throw ValidationError', () => {
      wrapValidationError(
        {
          atLeastOne: [
            {
              value: username,
              name: 'username',
              type: 'string',
              required: true,
            },
            {
              value: undefined,
              name: 'password',
              type: 'string',
              required: true,
            },
          ],
        },
        (e: IError | any) => {
          expect(e?.status).toEqual(400);
          expect(e?.error).toMatchObject({
            error: {
              message: 'validation error',
              details: [
                {
                  field: 'password',
                  details: 'password is required',
                },
              ],
            },
          });
        },
      );
    });

    it('should not throw error', () => {
      Validator({
        atLeastOne: [
          {
            value: username,
            name: 'username',
            type: 'string',
            required: true,
          },
          {
            value: undefined,
            name: 'password',
            type: 'string',
          },
        ],
      });
    });
  });
});

describe('Check value and length', () => {
  describe('check length', () => {
    it('should throw ValidationError', () => {
      wrapValidationError(
        {
          all: [
            {
              value: 'Shoe',
              name: 'username',
              minLength: 4,
              maxLength: 20,
            },
            {
              value: 'short',
              name: 'password',
              minLength: 8,
              maxLength: 50,
            },
          ],
        },
        (e: IError | any) => {
          expect(e?.status).toEqual(400);
          expect(e?.error).toMatchObject({
            error: {
              message: 'validation error',
              details: [
                {
                  field: 'password',
                  details: 'expected to be longer than 8',
                },
              ],
            },
          });
        },
      );
    });

    it('should not throw ValidationError', () => {
      Validator({
        all: [
          {
            value: 'Shoe',
            name: 'username',
            minLength: 4,
            maxLength: 20,
          },
          {
            value: 'short123',
            name: 'password',
            minLength: 8,
            maxLength: 50,
          },
        ],
      });
    });
  });

  describe('check value', () => {
    it('should throw ValidationError', () => {
      wrapValidationError(
        {
          all: [
            {
              value: 'Username',
              name: 'username',
            },
            {
              value: 16,
              name: 'age',
              type: 'number',
              minValue: 18,
            },
            {
              value: 10000,
              name: 'exp',
              type: 'number',
              maxValue: 100,
            },
          ],
        },
        (e: IError | any) => {
          expect(e?.status).toEqual(400);
          expect(e?.error).toMatchObject({
            error: {
              message: 'validation error',
              details: [
                {
                  field: 'age',
                  details: 'expected to be more than 18',
                },
                {
                  field: 'exp',
                  details: 'expected to be less than 100',
                },
              ],
            },
          });
        },
      );
    });

    it('should not throw ValidationError', () => {
      Validator({
        all: [
          {
            value: 22,
            name: 'age',
            type: 'number',
            minValue: 18,
          },
          {
            value: 99,
            name: 'exp',
            type: 'number',
            maxValue: 100,
          },
        ],
      });
    });
  });
});

describe('Check pattern matching', () => {
  it('should throw ValidationError', () => {
    wrapValidationError(
      {
        all: [
          {
            value: 'Shoe',
            name: 'username',
            type: 'string',
            pattern: /^[A-Za-z]+$/,
          },
          {
            value: 'short123',
            name: 'password',
            pattern: /^[A-Za-z]+$/,
          },
        ],
      },
      (e: IError | any) => {
        expect(e?.status).toEqual(400);
        expect(e?.error).toMatchObject({
          error: {
            message: 'validation error',
            details: [
              {
                field: 'password',
                details: 'does not match pattern',
              },
            ],
          },
        });
      });
  });

  it('should not throw ValidationError', () => {
    Validator({
      all: [
        {
          value: 'Shoe',
          name: 'username',
          type: 'string',
          pattern: /^[A-Za-z]+$/,
        },
        {
          value: 'password',
          name: 'password',
          pattern: /^[A-Za-z]+$/,
        },
      ],
    });
  });
});
