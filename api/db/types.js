const { Sequelize, DataTypes, Utils } = require('sequelize')


class ZONED extends DataTypes.ABSTRACT {
  toSql() {
    return this.key
  }
}


ZONED.prototype.key = ZONED.key = 'TIME WITH TIMEZONE'
DataTypes.ZONED = Utils.classToInvokable(ZONED)


module.exports = DataTypes
