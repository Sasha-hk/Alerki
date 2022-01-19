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

module.exports = {
    isNumber,
    isFloat,
    isString,
    isArray,
    isObject,
}