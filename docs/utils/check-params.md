# Check params

Cases:

- check if all exists

```js
{
  all: [
    name,
    username,
  ]
}
```

- check if at least one exists

```js
{
  atLeastOne: [
    firstName,
    lastName,
  ]
}
```

- check type

```js
{
  all: [
    {
      value: name,
      type: 'string',
    },
    {
      value: profileType,
      type: /(client|master)/,
    },
  ]
}
```

- check length of string

```js
{
  all: [
    {
      value: username,
      type: 'string',
      lessThan: 100,
    },
    {
      value: password,
      type: 'string',
      moreThan: 8,
    },
  ]
}
```
