const APIError = require('../../exception/APIError')


module.exports = (dateObject) => {
  if (Object.prototype.toString.call(dateObject) === '[object Date]') {
    if (isNaN(dateObject.getTime())) {
      throw APIError.IncorrectDateError()
    } else {
      return true
    }
  } 
  else {
    throw APIError.IncorrectDateError()
  }
}
