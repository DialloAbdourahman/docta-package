interface GeneralConfig {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
  awsAccessKey: string;
  awsSecretKey: string;
  awsS3Bucket: string;
  awsS3Region: string;
  forgotPasswordTokenSecret: string;
  activationTokenSecret: string;
}

export const getGeneralConfig = (): GeneralConfig => ({
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET ?? "",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET ?? "",
  accessTokenExpiry: Number(process.env.ACCESS_TOKEN_EXPIRY ?? 0),
  refreshTokenExpiry: Number(process.env.REFRESH_TOKEN_EXPIRY ?? 0),
  awsAccessKey: process.env.AWS_ACCESS_KEY ?? "",
  awsSecretKey: process.env.AWS_SECRET_KEY ?? "",
  awsS3Bucket: process.env.AWS_S3_BUCKET ?? "",
  awsS3Region: process.env.AWS_S3_REGION ?? "",
  forgotPasswordTokenSecret: process.env.FORGOT_PASSWORD_TOKEN_SECRET ?? "",
  activationTokenSecret: process.env.ACTIVATION_TOKEN_SECRET ?? "",
});
