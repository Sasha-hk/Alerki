import { Properties, Handler } from './interfaces';
import generics from './generics';

const typeHandler: Handler = function (props: Properties) {
  const dataset: Array<any> = [];

  dataset.push(generics.type(props.type));

  dataset.push(generics.type(props.type, true));

  return dataset;
};

export default {
  type: typeHandler,
};
