const { Sequelize, DataTypes, Utils } = require('sequelize')

module.exports = function createTheNewDataType() {
  class ZONED extends DataTypes.ABSTRACT {
    toSql() {
      return 'TIME WITH TIMEZONE'
    }
  }

  ZONED.prototype.key = ZONED.key = 'ZONED'
  DataTypes.ZONED = Utils.classToInvokable(ZONED)

  return DataTypes
}
