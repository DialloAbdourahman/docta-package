import {
  EnumTranzakCurrency,
  EnumTranzakPaymentStatus,
} from "../enums/tranzak";

export type GetPaymentTokenResponseData = {
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

export type TranzakGetPaymentTokenRequestDto = {
  appId: string;
  appKey: string;
};

export type CreatePaymentSessionResponseData = {
  requestId: string;
  amount: number;
  currencyCode: EnumTranzakCurrency;
  description: string;
  mobileWalletNumber: string | null;
  status: EnumTranzakPaymentStatus;
  transactionStatus: EnumTranzakPaymentStatus;
  createdAt: string;
  mchTransactionRef: string;
  appId: string;
  payerNote: string;
  serviceDiscountAmount: number | null;
  receivingEntityName: string | null;
  transactionTag: string | null;
  links: {
    returnUrl: string;
    cancelUrl: string;
    paymentAuthUrl: string;
  };
};

export type TranzakCreatePaymentSessionRequestDto = {
  amount: number;
  currencyCode: EnumTranzakCurrency;
  description: string;
  mchTransactionRef: string;
  returnUrl: string;
  cancelUrl: string;
};
