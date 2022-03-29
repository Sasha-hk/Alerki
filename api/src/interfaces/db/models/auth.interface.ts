interface IAuth {
  id: string;
  refreshToken: string;
  googleAccessToken: string;
  googleRefreshToken: string;
  deviceName: string;
  userID: string;
}

export default IAuth;
