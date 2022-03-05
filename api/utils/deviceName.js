module.exports = (req) => {
    if (req.headers['user-agent']) {
        const userAgent = req.headers['user-agent']
        const parsedHeaders = userAgent.match(/\(([^)]+)\)/)

        if (parsedHeaders) {
            return parsedHeaders[1]
        }
        else {
            return userAgent
        }
    }
    else {
        return 'undefined'
    }   
}