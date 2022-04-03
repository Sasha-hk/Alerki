import IValidateFields, { IValidateField } from './validator.interface';
import ValidationError from '../../errors/validation.error';
import checks, { FullCheck, PartialCheck } from './check';

export interface IErrorPool {
  [key: string]: string;
}

interface IPartialChecks {
  [key: string]: PartialCheck,
}

interface IFullChecks {
  [key: string]: FullCheck,
}

interface IValidator {
  partialChecks: IPartialChecks;
  fullChecks: IFullChecks;

  setPartialCheck(partialCheck: PartialCheck | Array<PartialCheck>): void;
  setFullCheck(fullCheck: FullCheck | Array<FullCheck>): void;
  validate(options: IValidateFields): void;
  throwError(errorPool: IErrorPool): void;
}

/**
 * Params validation class
 */
class Validator implements IValidator {
  partialChecks: IPartialChecks;
  fullChecks: IFullChecks;

  /**
   * Validator constructor
   */
  constructor() {
    this.partialChecks = checks.partialChecks;
    this.fullChecks = checks.fullChecks;
  }

  /**
   * Add partial check
   * @param partialCheck Partial checks
   */
  setPartialCheck(partialCheck: PartialCheck) {
    this.partialChecks = { ...this.partialChecks, ...partialCheck };
  }

  /**
   * Add full check
   * @param fullCheck Full check
   */
  setFullCheck(fullCheck: FullCheck) {
    this.fullChecks = { ...this.fullChecks, ...fullCheck };
  }

  /**
   * Validate params
   * @param fields Params to validate
   */
  validate(fields: IValidateFields) {
    const fieldKeys = Object.keys(fields);
    const fieldKeysLength = fieldKeys.length;

    const partialCheckKeys = Object.keys(this.partialChecks);
    const partialChecksLength = partialCheckKeys.length;
    const fullCheckKeys = Object.keys(this.fullChecks);
    const fullChecksLength = fullCheckKeys.length;

    const errorPool: IErrorPool = {};
    let throwError = false;

    // Partial checks
    for (let i = 0; i < fieldKeysLength; i++) {
      for (let j = 0; j < partialChecksLength; j++) {
        // Check if validation type specified in field
        if (fieldKeys[i] === partialCheckKeys[j]) {
          if (this.partialChecks[partialCheckKeys[j]](fields[fieldKeys[i]], errorPool, fieldKeys[i])) {
            throwError = true;
            continue;
          }
        }
      }
    }

    // Full checks
    for (let i = 0; i < fullChecksLength; i++) {
      if (this.fullChecks[fullCheckKeys[i]](fields, errorPool)) {
        throwError = true;
      }
    }

    if (throwError) {
      this.throwError(errorPool);
    }
  }

  /**
   * Static method to validate params, without user checks
   * @param fields Params to validate
   */
  static validate(fields: IValidateFields) {}

  /**
   * Throw error
   * @param errorPool Errors
   */
  throwError(errorPool: IErrorPool) {
    throw new ValidationError(400, 'Validation error', {
      error: {
        message: 'validation error',
        details: errorPool,
      },
    });
  }
}

export default Validator;
