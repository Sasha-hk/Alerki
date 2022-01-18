const APIError = require('../exception/APIError')

// cause error
function causeError(errors) {
    throw APIError.BadRequestError(errors)
}

// make errors list
function prepareErrors(parameters) {
    // check if parameters if array or object    
    if (Array.isArray(parameters)) {
        parameters.filter(p => p)
        
        causeError(parameters)
    }
    else if (typeof parameters === 'object' && parameters !== null) {
        let errors = []

        Object.keys(parameters).forEach(p => {
            if (!parameters[p]) {
                errors.push(`${p} is required`)
            }
        })

        causeError(errors)
    }


}

// check parameters function
module.exports = (parameters) => {
    // check if parametser is array or object
    if (Array.isArray(parameters)) {
        parameters.forEach(p => {
            if (!p) {
                prepareErrors(parameters)
            }
        })
    }
    else if (typeof parameters === 'object' && parameters !== null) {
        Object.keys(parameters).forEach(p => {
            if (!parameters[p]) {
                prepareErrors(parameters)
            }
        })
    }
    else {
        throw Error('Parameters it is neither an array nor an object')
    }
}
