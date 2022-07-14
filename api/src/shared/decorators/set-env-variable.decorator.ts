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
export function SetEnvVariable(variableName: string, type: SetAs = SetAs.string) {
  const variable = process.env[variableName];

  if (!variable) {
    throw new Error(`${variableName} not exists, please set it in .env file`);
  }

  let parsed: string | number | any;

  switch (type) {
  case SetAs.string:
    return variable;

  case SetAs.number:
    parsed = Number(variable);

    if (isNaN(parsed)) {
      throw new Error(`${variableName} is not a number, but we got ${variable}`);
    }

    return parsed;

  default:
    return variable;
  }
}
