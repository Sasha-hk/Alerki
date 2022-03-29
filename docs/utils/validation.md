# Validation utility

This utility is designed to verify the correctness of the input data in the API.

Table of contents:

- [Validation utility](#validation-utility)
  - [Using](#using)
  - [Validation types](#validation-types)
  - [Check properties](#check-properties)
    - [Required](#required)
    - [Type](#type)
    - [Min/max length](#minmax-length)
    - [Min/max value](#minmax-value)
    - [Pattern](#pattern)

## Using

**Import:**

```ts
import Validator from '../utils/validator';
```

**Use cases:**

You need to check if user send correct param called age, it can has value from 18 to 60:

```ts
setAge(req: Request, res: Response) {
  try {
    const { age } = req.body;

    Validator({
      all: [
        {
          value: age,
          name: 'age',
          minValue: 18,
          maxValue: 60,
        },
      ],
    });

    res.send('OK');
  } catch (e: IError | any) {
    res.status(e?.status || 500).json(e?.error);
  }
}
```

## Validation types

We can use two validation types, the first type checks that all parameters are exists `all`, the second type checks that at least one parameter are exists `atLeastOne`.

**All:**

```ts
Validator({
  all: [
    {
      value: age,
      name: 'age',
    },
    {
      value: username,
      name: 'username',
    }
  ],
});
```

**At least one:**

```ts
Validator({
  atLeastOne: [
    {
      value: age,
      name: 'age',
    },
    {
      value: username,
      name: 'username',
    }
  ],
});
```

## Check properties

### Required

```ts
{
  value: age,
  name: 'age',
  required: true,
},
```

The property check if the param exists.

### Type

```ts
{
  value: age,
  name: 'age',
  type: 'number',
},
```

The property checks if variable age is number.

### Min/max length

```ts
{
  value: username,
  name: 'username',
  minLength: 4,
  maxLength: 30,
},
```

The property checks if name are between 4 and 30 characters.

### Min/max value

```ts
{
  value: age,
  name: 'age',
  minValue: 18,
  maxValue: 70,
},
```

The property checks if age between 18 and 70.

### Pattern

```ts
{
  value: email,
  name: 'email',
  pattern: /\w+@\w+.\w/,
},
```

The property checks if email matching the regular expression.
