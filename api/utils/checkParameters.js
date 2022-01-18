const APIError = require('../exception/APIError')

// cause error
function makeError(errors) {
    throw APIError.BadRequestError(errors)
}

// make errors
function prepareErrors(parameters) {
    let errors = []
    Object.keys(parameters).forEach(p => {
        errors.push(`${p} is required`)
    })

    makeError(errors)
}

// check parameters function
module.exports = (parameters) => {
    parameters.forEach(p => {
        if (!p) {
            prepareErrors(parameters)
        }
    })
}
