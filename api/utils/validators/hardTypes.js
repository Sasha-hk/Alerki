const APIError = require('../../exception/APIError')
const {
    isNumber,
    isFloat,
    isString,
    isArray,
    isObject,
} = require('./checkTypes')


function hardIsNumber(number, name) {
    if (!isNumber(number)) {
        throw APIError.BadRequestError([name + ' may to be a number'])
    }
}

function hardIsFloat(float, name) {
    if (!isFloat(float)) {
        throw APIError.BadRequestError([name + ' may to be a float'])
    }
}

function hardIsString(string, name) {
    if (!isString(string)) {  
        throw APIError.BadRequestError([name + ' may to be a string'])
    }
}

function hardIsArray(array, name) {
    if (!isArray(array)) {
        throw APIError.BadRequestError([name + ' may to be an array'])
    }
}

function hardIsObject(object, name) {
    if (!isObject(object)) {
        throw APIError.BadRequestError([name + ' may to be an object'])
    }
}

module.exports = {
    isNumber: hardIsNumber,
    isFloat: hardIsFloat,
    isString: hardIsString,
    isArray: hardIsArray,
    isObject: hardIsObject,
}