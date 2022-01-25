const APIError = require('../../exception/APIError')


module.exports = (dateObject) => {
    if (Object.prototype.toString.call(dateObject) === "[object Date]") {
        if (isNaN(dateObject.getTime())) {
            throw APIError.IncorrectDateError()
        } else {
            console.log(12)
        }
    } 
    else {
        throw APIError.IncorrectDateError()
    }
}
