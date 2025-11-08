export type GetPaymentTokenResponse = {
  scope: string;
  appId: string;
  token: string;
  expiresIn: number;
};

export type TranzakApiResponse<T> = {
  data: T;
  success: true;
  errorMsg?: string;
  errorCode?: number;
};
