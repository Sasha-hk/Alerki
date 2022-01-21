const APIError = require('../exception/APIError')


function causeError(errors) {
    throw APIError.BadRequestError(errors)
}

function prepareError(parameters) {
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

module.exports = (parameters) => {
    for (const p of Object.keys(parameters)) {
        if (parameters[p]) {
            return true
        }
    }
    
    prepareError(parameters)
}
