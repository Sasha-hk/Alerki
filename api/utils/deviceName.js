module.exports = (req) => {
    // parse headers
    const userAgent = req.headers['user-agent']
    const parsedHeaders = userAgent.match(/\(([^)]+)\)/)
   
    if (parsedHeaders) {
        return parsedHeaders[1]
    }
    else {
        return userAgent
    }
}