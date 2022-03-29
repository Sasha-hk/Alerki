interface IAuth {
  id: number;
  refreshToken: string;
  googleAccessToken: string;
  googleRefreshToken: string;
  deviceName: string;
  userID: number;
}

export default IAuth;
