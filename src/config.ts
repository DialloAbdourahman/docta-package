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

export const generalConfig: GeneralConfig = {
  accessTokenSecret: String(process.env.ACCESS_TOKEN_SECRET),
  refreshTokenSecret: String(process.env.REFRESH_TOKEN_SECRET),
  accessTokenExpiry: Number(process.env.ACCESS_TOKEN_EXPIRY),
  refreshTokenExpiry: Number(process.env.REFRESH_TOKEN_EXPIRY),
  awsAccessKey: String(process.env.AWS_ACCESS_KEY),
  awsSecretKey: String(process.env.AWS_SECRET_KEY),
  awsS3Bucket: String(process.env.AWS_S3_BUCKET),
  awsS3Region: String(process.env.AWS_S3_REGION),
  forgotPasswordTokenSecret: String(process.env.FORGOT_PASSWORD_TOKEN_SECRET),
  activationTokenSecret: String(process.env.ACTIVATION_TOKEN_SECRET),
};
