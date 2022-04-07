import { IValidateProperties } from '../validator/validator.interface';

export interface Properties extends IValidateProperties {
  dataset: Array<any>,
  include: Array<any>,
  exclude: Array<any>,
}

export interface Request {
  body: { [key: string]: Properties },
  cookies: { [key: string]: Properties },
  query: { [key: string]: Properties },
  successCode: number,
}

export interface Response {
  body: { [key: string]: any },
  cookies: { [key: string]: any },
  code: number,
}

export interface Config {
  request: Request,
  response: Response
}

export interface Handler {
  (): any;
}

export interface Generic {
  (): any;
}

export interface Generics {
  [key: string]: Generic,
}

export interface Handlers {
  [key: string]: Handler,
}

export interface ToTestConstructor {
  new(): ToTestInterface;
}

export interface ToTestInterface {
  generics: Generics;
  handlers: Handlers;

  setGenerics(generics: Generics): void;
  setHandlers(handlers: Handlers): void;
  test(config: Config): void;
  _test(request: Request, response: Response): Response;
  handle(property: Properties): any;
}

export default function (ctor: ToTestConstructor): ToTestInterface {
  return new ctor();
}
