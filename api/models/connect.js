const { sequelize } = require('./index')
const env = process.env.NODE_ENV || 'development'


module.exports = async (callback) => {
    if (env == 'development') {
        await sequelize.sync({
            alter: true,
            logging: false
        })
    }
    else if (env == 'production') {
        await sequelize.authenticat()
    }
    else if (env == 'test') {
        await sequelize.sync({
            logging: false
        })
    }

    callback()
}
