const { sequelize } = require('./index')
const env = process.env.NODE_ENV || 'development'


module.exports = async (callback) => {
    if (env == 'development') {
        await sequelize.sync({
            force: true,
            logging: false
        })
    }
    else if (env == 'production') {
        await sequelize.authenticate()
    }
    else if (env == 'test') {
        await sequelize.sync({
            alter: true,
            logging: true,
        })
    }

    callback()
}
