import RandExp from 'randexp';
import { IValidateProperties } from '../validator/validator.interface';

interface IParams extends IValidateProperties {
  dataset?: Array<any>;
  exclude?: Array<any>;
  include?: Array<any>;
  badCode?: number;
  incorrectCode?: number;
}

interface IResponse {
  body?: { [key: string]: any };
  cookies?: { [key: string]: any };
  status?: number;
}

interface ITestConfig {
  request: {
    body?: { [key: string]: IParams },
    cookies?: { [key: string]: IParams },
    query?: { [key: string]: IParams },
  };
  response?: {
    body?: { [key: string]: IResponse },
    cookies?: { [key: string]: IResponse },
    successCode?: number,
    errorCode?: number,
  };
}

interface ICompare {
  expected: IResponse;
  received: IResponse;
}

interface ITestData {
  body: any | null;
  cookies: any | null;
  query: any | null;
}

interface ITotest {
  config: ITestConfig;
  tokens: { [key: string]: IParams };
  uniqueData: {
    body?: { [key: string]: Array<any> },
    cookie?: { [key: string]: Array<any> },
    query?: { [key: string]: Array<any> },
  };
}

interface IToken extends IParams {
  group: string;
}

class Totest implements ITotest {
  config: ITestConfig;
  tokens: { [key: string]: IToken };
  uniqueData: {
    body?: { [key: string]: Array<any> },
    cookie?: { [key: string]: Array<any> },
    query?: { [key: string]: Array<any> },
  };

  send: (data: ITestData) => IResponse;
  compare: (response: ICompare) => void;

  constructor(
    config: ITestConfig,
    send: (data: ITestData) => IResponse,
    compare: (response: ICompare) => void,
  ) {
    this.send = send;
    this.compare = compare;

    this.config = config;
    this.tokens = {};
    this.uniqueData = {};

    this.parseConfig();
  }

  parseConfig() {
    const requestKeys = Object.keys(this.config.request);
    const requestKeysLength = requestKeys.length;

    for (let i = 0; i < requestKeysLength; i++) {
      this.tokens = { ...this.tokens, ...(this.config.request as any)?.[requestKeys[i]] };
    }
  }

  test() {
    const tokenKeys = Object.keys(this.tokens);

    if (!tokenKeys?.length) {
      return 0;
    }

    const token = { ...this.tokens[tokenKeys[0]] };

    const propertiesHit = Object.keys(token).length * 2;

    console.log(token, tokenKeys[0], propertiesHit);

    delete this.tokens[tokenKeys[0]];

    for (let i = 0; i < propertiesHit; i++) {
      this.test();
    }
  }

  handlePattern(properties: IParams) {
    // L const r = RegExp(properties.pattern);

    // const rs = r.source;

    // const matchesCount = rs.match(/\{([^}])+\}/g)?.length;

    // const max = Math.floor(properties.maxLength / matchesCount);

    // console.log(rs.replace(/\{([^}])+\}/g, `{0,${max}}`));
  }

  // L genData(params: { [key: string]: string }) {
  //   const paramKeys = Object.keys(params);

  //   if (paramKeys.length === 0) {
  //     return 0;
  //   }

  //   const paramConfig = (this.config.request as any)?.[params[paramKeys[0]]][paramKeys[0]];

  //   console.log(paramKeys[0], paramConfig);

  //   delete params[paramKeys[0]];

  //   this.genData(params);
  // }
}

export default Totest;
