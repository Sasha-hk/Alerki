interface IAuth {
  id: string;
  refreshToken: string;
  googleAccessToken: string;
  googleRefreshToken: string;
  deviceName: string;
  userID: number;
}

export default IAuth;
