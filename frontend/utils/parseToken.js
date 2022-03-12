export default (token) => {
    const base64Token = token.split('.')[1]
    const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/')
    const tokenData = decodeURIComponent(
        atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        },
    ).join(''));

    return JSON.parse(tokenData)
}