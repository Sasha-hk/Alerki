import {
  ToTestConstructor,
  ToTestInterface,
  TestingDataset,
  Compare,
  Properties,
  Request,
  Response,
  Config,
  Generic,
  Generics,
  Handler,
  Handlers,
  SendRequestCallback,
  CompareCallback,
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

  test(
    config: Config,
    send: SendRequestCallback,
    compare: CompareCallback,
  ) {
    this._test(config.request, config.response, send, compare);
  }

  _test(
    request: Request,
    response: Response,
    send: SendRequestCallback,
    compare: CompareCallback,
  ) {
    const prop = this.prepareFirstProp(request);

    if (!prop) {
      return undefined;
    }

    if (!prop.prop.cascade) {
      const dataset: Array<any> = this.handle(prop.prop, prop.key);

      for (let i = 0; i < dataset.length; i++) {
        const res: Response = {};

        res[prop.key] = dataset[i];

        this._test(request, response, send, compare);
      }

      return response;
    }

    console.log(2);

    return response;
  }

  handle(property: Properties, key: string) {
    console.log('handler >>> ', property, key);

    return [1, 2];
  }

  prepareFirstProp(request: Request) {
    const requestKeys = Object.keys(request);
    const requestKeysLength = requestKeys.length;

    if (!requestKeysLength) {
      return undefined;
    }

    const firstProp = (request as any)?.[requestKeys[0]]?.[Object.keys(request[requestKeys[0]])[0]];
    const firstPropKey = [Object.keys(request[requestKeys[0]])[0]][0];

    delete (request as any)?.[requestKeys[0]]?.[Object.keys(request[requestKeys[0]])[0]];

    if (!firstProp || !firstPropKey) {
      return undefined;
    }

    return { prop: firstProp, key: firstPropKey };
  }
}

export default ToTest;
