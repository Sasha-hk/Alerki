const shapeFlags = flags =>
    flags.reduce((shapedFlags, flag) => {
        const [flagName, rawValue] = flag.split('=')
        const value = rawValue ? rawValue.replace('', '') : true
        return { ...shapedFlags, [flagName]: value }
    }, {})

const extractCookies = headers => {
    const cookies = headers['set-cookie']

    if (cookies) {
        return cookies.reduce((shapedCookies, cookieString) => {
            const [rawCookie, ...flags] = cookieString.split(' ')
            const [cookieName, value] = rawCookie.split('=')
            return { ...shapedCookies, [cookieName]: { value, flags: shapeFlags(flags) } }
        }, {})
    }
    else {
        return null
    }
}

module.exports = {
    shapeFlags,
    extractCookies
}