# Data generator

The utility is designed to generate data for testing API.

Table of contents:

- [Data generator](#data-generator)
  - [Requirements to functionality](#requirements-to-functionality)
  - [Example view](#example-view)
    - [Iteration count definition](#iteration-count-definition)

## Requirements to functionality

The utility should can:

- generate data based on specification:
  - testing depth
  - specification it should take from validator utility blanks or handmade
  - data type eg. `string`
  - range / exceptions:
    - for numbers
    - for dates
    - for week days
  - based on other data items:
    - array of week days with exceptions
  - based on pattern
  - specify required fields
  - specify at least on required fields
  - unique

## Example view

```js
DataGen({
  username: {
    required: true,
    minLength: 4,
    maxLength: 30,
    pattern: /\w{4,30}/,
    unique: true,
  },
  email: {
    required: true,
    minLength: 4,
    maxLength: 30,
    pattern: /\w{4,30}/,
    unique: true,
  }
})
```

### Iteration count definition

There are lits of properties:

- maxLength
- minLength
- required
- pattern
- relation with other file
- at lest one with other field

each property has weight, we count sum of all specified properties, result is count of field variants
