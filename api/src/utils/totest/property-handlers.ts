const dataTypes = {
  number: 1,
  boolean: true,
  null: null,
  undefined,
  string: 'string',
  object: {},
  array: [],
  date: new Date(),
};

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min));
}

export function type(type: string, revert: boolean = false) {
  const dataTypesKeys = Object.keys(dataTypes);
  const dataTypesKeysLength = dataTypesKeys.length;
  let resultType: any = null;

  if (revert) {
    resultType = (dataTypes as any)?.[dataTypesKeys[randInt(0, dataTypesKeysLength)]];
    while (type === resultType) {
      resultType = (dataTypes as any)?.[dataTypesKeys[randInt(0, dataTypesKeysLength)]];
    }

    return resultType;
  }

  return (dataTypes as any)?.[type];
}

console.log(type('string', true));
console.log(type('boolean'));
