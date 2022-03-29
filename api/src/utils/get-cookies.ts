interface ICookies {
  [key: string]: string;
}

const getCookies = (response: any) => {
  const setCookiesHeder = response['set-cookie'] ? response['set-cookie'] : response.headers['set-cookie'];
  const cookies: ICookies = {};

  if (setCookiesHeder) {
    setCookiesHeder.forEach((cookie: string) => {
      const parsed = cookie.split(';')[0].split('=');
      cookies[parsed[0]] = parsed[1];
    });
  }

  return cookies;
};

export default getCookies;
