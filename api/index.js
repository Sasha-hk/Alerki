const dbConnect = require('./db/connect')
const app = require('./app')

const PORT = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'development'


const start = async () => {
    if (env == 'development') {
        try {
            await dbConnect(() => {
                console.log('Connected to database')
            })
            app.listen(PORT, () => {
                console.log(`Server started! http://localhost:${PORT}`)
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    else if (env == 'production') {
        await dbConnect(() => {
            console.log('Connected to database!')
        })
        app.listen(PORT, () => {
            console.log('Server started!')
        })
    }
}

start()
