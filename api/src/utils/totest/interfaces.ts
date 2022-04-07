import { IValidateProperties } from '../validator/validator.interface';

export interface Properties extends IValidateProperties {
  dataset: Array<any>,
  include: Array<any>,
  exclude: Array<any>,
}

export interface Request {
  /** Body props */
  body: { [key: string]: Properties },
  /** Cookie props */
  cookies: { [key: string]: Properties },
  /** Query props */
  query: { [key: string]: Properties },
  /** Success code */
  successCode: number,
}

export interface Response {
  /** Body response */
  body: { [key: string]: any },
  /** Cookie response */
  cookies: { [key: string]: any },
  /** Response code */
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
  /** Generics list */
  generics: Generics;
  /** Handlers list */
  handlers: Handlers;

  /**
   * User custom generics.
   *
   * Generic is a function that generate data.
   * @param generics Generics
   */
  setGenerics(generics: Generics): void;

  /**
   * User custom handlers.
   *
   * Handler is a function that calls generics and control
   * generation types(valid|invalid).
   * @param handlers Handlers
   */
  setHandlers(handlers: Handlers): void;

  /**
   * Run testing based on configuration.
   * @param config Test configuration object
   */
  test(config: Config): void;

  /**
   * Private recursive function designed to implement data generation
   * process with all possible variants.
   * @param request Request object
   * @param response Response object
   */
  _test(request: Request, response: Response): Response;

  /**
   * Handle property
   * @param property Prop specification object
   */
  handle(property: Properties): any;

  /**
   * Get first prop config and delete it.
   * @param config Configuration object
   */
  prepareFirstProp(config: Config): Properties;
}

/**
 * Create ToTest object.
 * @param ctor Constructor
 * @returns ToTest object
 */
export default function (ctor: ToTestConstructor): ToTestInterface {
  return new ctor();
}
