const dbConnect = require('../db/connect')


module.exports = async () => {
  await dbConnect()
}
