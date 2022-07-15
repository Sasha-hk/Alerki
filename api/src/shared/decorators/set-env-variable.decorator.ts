/**
 * Parse options
 */
export enum SetAs {
  string = 'string',
  number = 'number',
}

/**
 * Set environment variable
 *
 * Checks:
 * - if variable is not empty
 * - parse to specified type (by default string)
 *
 * @param variableName variable name in environment
 * @param type parse to type
 * @returns prepared and checked value
 */
export function SetEnvVariable(variableName: string, type: SetAs = SetAs.string): PropertyDecorator {
  return (target: Record<string, any>, key: string | symbol) => {
    const variable = process.env[variableName];

    if (!variable) {
      throw new Error(`${variableName} not exists, please set it in the .env file`);
    }

    let prepared: string | number | any;

    switch (type) {
    case SetAs.string:
      prepared = variable;
      break;

    case SetAs.number:
      prepared = Number(variable);

      if (isNaN(prepared)) {
        throw new Error(`${variableName} is not a number, but we got ${typeof variable}: ${variable}`);
      }

      break;

    default:
      throw new Error('Specified unhandled type');
    }

    target[key as string] = prepared;
  };
}
