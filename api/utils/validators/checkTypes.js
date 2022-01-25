const APIError = require('../../exception/APIError')


// return true or false
function isNumber(number) {
    return Number(number) === number && number % 1 === 0 
}

function isFloat(float) {
    return Number(float) === float && float % 1 !== 0
}

function isString(string) {
    return typeof string === 'string'
}

function isArray(array) {
    return Array.isArray(array)
}

function isObject(object) {
    return typeof object === 'object' && object !== null
}


// cause error
function hardNumber(number, name) {
    if (!isNumber(number)) {
        throw APIError.BadRequestError([name + ' may to be a number'])
    }
}

function hardFloat(float, name) {
    if (!isFloat(float)) {
        throw APIError.BadRequestError([name + ' may to be a float'])
    }
}

function hardString(string, name) {
    if (!isString(string)) {  
        throw APIError.BadRequestError([name + ' may to be a string'])
    }
}

function hardArray(array, name) {
    if (!isArray(array)) {
        throw APIError.BadRequestError([name + ' may to be an array'])
    }
}

function hardObject(object, name) {
    if (!isObject(object)) {
        throw APIError.BadRequestError([name + ' may to be an object'])
    }
}

module.exports = {
    isNumber,
    isFloat,
    isString,
    isArray,
    isObject,

    hardNumber,
    hardFloat,
    hardString,
    hardArray,
    hardObject,
}