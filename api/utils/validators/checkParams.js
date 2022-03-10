const APIError = require('../../exception/APIError')


function causeError(errors) {
  throw APIError.BadRequestError(errors)
}

function prepareAllErrors(parameters) {
  let errors = {}

  Object.keys(parameters).forEach(p => {
    if (!parameters[p]) {
      // errors.push(`${p} is required`)
      errors[p] = `${p} is required`
    }
  })

  causeError(errors)
}

function prepareAtLeastOneError(parameters) {
  let error = ''

  Object.keys(parameters).forEach((p, i) => {
    if (i !== 0) {
      error += ` or ${p}`
    }
    else {   
      error += p
    }
  })
    
  error += ' is required'
    
  causeError([error])
}


function all(parameters) {
  if (typeof parameters === 'object' && parameters !== null) {
    Object.keys(parameters).forEach(p => {
      if (!parameters[p]) {
        prepareAllErrors(parameters)
      }
    })
  }
  else {
    throw Error('Parameters is not an object')
  }
}

function atLeastOne(parameters) {
  for (const p of Object.keys(parameters)) {
    if (parameters[p]) {
      return true
    }
  }
    
  prepareAtLeastOneError(parameters)
}


module.exports = {
  all,
  atLeastOne,
}