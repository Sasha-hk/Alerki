const APIError = require('../exception/APIError')

// cause error
function causeError(errors) {
    throw APIError.BadRequestError(errors)
}

// make errors list
function prepareErrors(parameters) {
    let errors = []

    Object.keys(parameters).forEach(p => {
        if (!parameters[p]) {
            errors.push(`${p} is required`)
        }
    })

    causeError(errors)
}

// check parameters function
module.exports = (parameters) => {
    // check if parameters is object
    if (typeof parameters === 'object' && parameters !== null) {
        Object.keys(parameters).forEach(p => {
            if (!parameters[p]) {
                prepareErrors(parameters)
            }
        })
    }
    else {
        throw Error('Parameters is not an object')
    }
}
