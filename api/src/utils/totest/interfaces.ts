import { IValidateProperties } from '../validator/validator.interface';

export interface Prop extends IValidateProperties {
  dataset: Array<any>,
  include: Array<any>,
  exclude: Array<any>,
}

interface Config {
  request: {
    body: { [key: string]: Prop },
    cookies: { [key: string]: Prop },
    query: { [key: string]: Prop },
    successCode: number,
  },
  response: {
    body: {},
    cookies: {},
    code: number,
  }
}

interface Generic {}

interface Generics {
  [key: string]: any,
}

interface Handler {}

interface ToTest {
  readonly generics: { [key: string]: () => any },
  readonly handlers: { [key: string]: () => any },

  setGenerics(): void;
  setHandlers(): void;
  test(config: Config): void;
}

export default ToTest;
