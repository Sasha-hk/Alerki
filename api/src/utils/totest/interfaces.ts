import { IValidateProperties } from '../validator/validator.interface';

export interface Properties extends IValidateProperties {
  cascade?: boolean,
  dataset?: Array<any>,
  include?: Array<any>,
  exclude?: Array<any>,
}

export interface Dataset {
  /** Body props */
  body?: { [key: string]: Properties },
  /** Cookie props */
  cookies?: { [key: string]: Properties },
}

export interface Request extends Dataset {
  /** Query props */
  query?: { [key: string]: Properties },
  /** Success code */
  successCode?: number,
}

export interface Response extends Dataset {
  /** Response code */
  code?: number,
}

export interface TestingDataset extends Dataset {
  query: { [key: string]: any },
}

export interface Compare {
  expect: {
    code: number,
  } & Dataset,
  received: Response,
}

export interface Config {
  request: Request,
  response: Response,
}

export interface Handler {
  (): any;
}

export interface Generic {
  (): any;
}

export interface SendRequestCallback {
  (data: TestingDataset): any;
}

export interface CompareCallback {
  (data: Compare): any;
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
  test(
    config: Config,
    send: SendRequestCallback,
    compare: CompareCallback,
  ): void;

  /**
   * Private recursive function designed to implement data generation
   * process with all possible variants.
   * @param request Request object
   * @param response Response object
   */
  _test(
    request: Request,
    response: Response,
    send: SendRequestCallback,
    compare: CompareCallback,
  ): Response | undefined;

  /**
   * Handle property
   * @param property Prop specification object
   */
  handle(property: Properties, key: string): Array<any>;

  /**
   * Get first prop config and delete it.
   * @param request Configuration object
   */
  prepareFirstProp(request: Request): { prop: Properties, key: string } | undefined;
}

/**
 * Create ToTest object.
 * @param ctor Constructor
 * @returns ToTest object
 */
export default function (ctor: ToTestConstructor): ToTestInterface {
  return new ctor();
}
