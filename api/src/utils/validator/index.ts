import IValidateFields, { IValidateField } from './validator.interface';
import ValidationError from '../../errors/validation.error';
import checks, { FullCheck, PartialCheck } from './check';

interface IValidator {
  partialChecks: Array<PartialCheck>;
  fullChecks: Array<FullCheck>;

  setPartialCheck(partialCheck: PartialCheck | Array<PartialCheck>): void;
  setFullCheck(fullCheck: FullCheck | Array<FullCheck>): void;
  validate(options: IValidateFields): void;
  // D trhowError(errorPool): never;
}

interface IErrorPool {
  [key: string]: string[];
}

/**
 * Params validation class
 */
class Validator implements IValidator {
  partialChecks: Array<PartialCheck>;
  fullChecks: Array<FullCheck>;

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
  setPartialCheck(partialCheck: PartialCheck | Array<PartialCheck>) {
    if (Array.isArray(partialCheck)) {
      this.partialChecks.push(...partialCheck);
    } else {
      this.partialChecks.push(partialCheck);
    }
  }

  /**
   * Add full check
   * @param fullCheck Full check
   */
  setFullCheck(fullCheck: FullCheck | Array<FullCheck>) {
    if (Array.isArray(fullCheck)) {
      this.fullChecks.push(...fullCheck);
    } else {
      this.fullChecks.push(fullCheck);
    }
  }

  /**
   * Validate params
   * @param fields Params to validate
   */
  validate(fields: IValidateFields) {
    const keys = Object.keys(fields);
    // L let errorPool: IErrorPool = {};

    // Partial checks
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < this.partialChecks.length; j++) {
        const response = this.partialChecks[j](fields[keys[i]], keys[i]);

        if (response) {
          // D errors[keys[i]] = [...errors[keys[i]], response];
          console.log(12);
        }
      }
    }

    // Full checks
    for (let i = 0; i < this.fullChecks.length; i++) {
      this.fullChecks[i](fields);
    }
  }

  /**
   * Static method to validate params, without user checks
   * @param fields Params to validate
   */
  static validate(fields: IValidateFields) {
    const keys = Object.keys(fields);

    // Partial checks
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < checks.fullChecks.length; j++) {
        checks.partialChecks[j](fields[keys[i]], keys[i]);
      }
    }

    // Full checks
    for (let i = 0; i < checks.fullChecks.length; i++) {
      checks.fullChecks[i](fields);
    }
  }
}

export default Validator;
