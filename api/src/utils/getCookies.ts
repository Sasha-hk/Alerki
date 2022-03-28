const shapeFlags = (flags: string[]) =>
  flags.reduce((shapedFlags, flag: string) => {
    const [flagName, rawValue] = flag.split('=');
    const value = rawValue ? rawValue.replace('', '') : true;
    return { ...shapedFlags, [flagName]: value };
  }, {});

const extractCookies = (headers: any) => {
  const cookies = headers['set-cookie'];

  if (cookies) {
    return cookies.reduce((shapedCookies: any, cookieString: string) => {
      const [rawCookie, ...flags] = cookieString.split(' ');
      const [cookieName, value] = rawCookie.split('=');
      return { ...shapedCookies, [cookieName]: { value, flags: shapeFlags(flags) } };
    }, {});
  }

  return null;
};

export default extractCookies;
