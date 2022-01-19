const APIError = require('../exception/APIError')

// cause error
function causeError(errors) {
    throw APIError.BadRequestError(errors)
}

// make errors list
function prepareError(parameter) {
    let errors = []

    Object.keys(parameter).forEach(p => {
        if (!parameter[p]) {
            errors.push(`${p} is required`)
        }
    })

    causeError(errors)
}

// check parameters function
module.exports = (parameter) => {
    console.log('=========')
    // check if parameters is object
    if (typeof parameter === 'object' && parameter !== null) {
        Object.keys(parameter).forEach(p => {
            if (!parameter[p]) {
                prepareError(parameter)
            }
            else {
                return true
            }
        })
    }
    else {
        throw Error('Parameters is not an object')
    }
}