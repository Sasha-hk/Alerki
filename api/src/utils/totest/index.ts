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
  Dataset,
} from './interfaces';
import handlers from './handlers';

class ToTest implements ToTestInterface {
  generics: Generics;
  handlers: Handlers;
  config: Config;
  send: SendRequestCallback;
  compare: CompareCallback;

  constructor() {
    this.generics = {};
    this.handlers = { ...handlers };
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
    this.config = config;
    this.send = send;
    this.compare = compare;

    const dataset: TestingDataset = {};

    this._test(dataset);
  }

  _test(dataset: TestingDataset) {
    const prop = this.prepareFirstProp(this.config.request);

    if (!prop) {
      this.sendAndCompare(dataset);
      return undefined;
    }

    if (!prop.prop.cascade) {
      const dataItem: Array<any> = this.handle(prop.prop, prop.key);

      console.log(dataItem);
      for (let i = 0; i < dataItem.length; i++) {
        dataset[prop.key] = dataItem[i];

        this._test(dataset);
      }

      return undefined;
    }

    // Here in for loop should iterates all the variants of date
    // make it later

    this.sendAndCompare(dataset);
    return undefined;
  }

  handle(prop: Properties, key: string) {
    const propertyKeys = Object.keys(prop);
    const propertyKeysLength = propertyKeys.length;
    const dataset: Array<any> = [];

    for (let i = 0; i < propertyKeysLength; i++) {
      if (propertyKeys[i] in this.handlers) {
        dataset.push(this.handlers[propertyKeys[i]](prop));
      }
    }

    return dataset;
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

  async sendAndCompare(data: Dataset): Promise<void> {
    await this.send(data);
    this.compare(null);
  }
}

export default ToTest;
