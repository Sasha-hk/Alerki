import {
  ToTestConstructor,
  ToTestInterface,
  Properties,
  Request,
  Response,
  Config,
  Generic,
  Generics,
  Handler,
  Handlers,
} from './interfaces';

class ToTest implements ToTestInterface {
  generics: Generics;
  handlers: Handlers;

  constructor() {
    this.generics = {};
    this.handlers = {};
  }

  setGenerics(generics: Generics) {
    Object.assign(this.generics, generics);
  }

  setHandlers(handlers: Handlers) {
    Object.assign(this.handlers, handlers);
  }

  test(config: Config) {}

  _test(request: Request, response: Response) {
    return response;
  }

  handle(property: Properties) {}

  prepareFirstProp(config: Config) {
    const requestKeys = Object.keys(config.request);
    const requestKeysLength = requestKeys.length;

    if (!requestKeysLength) {
      return undefined;
    }

    const firstProp = (config.request as any)?.[Object.keys(config[requestKeys[0]])[0]];

    delete (config.request as any)?.[Object.keys(config[requestKeys[0]])[0]];

    return firstProp;
  }
}

export default ToTest;
