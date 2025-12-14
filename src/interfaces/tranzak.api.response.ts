import {
  EnumTranzakCurrency,
  EnumTranzakEventType,
  EnumTranzakPaymentStatus,
  EnumTranzakReasonCode,
  EnumTranzakRefundStatus,
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

export type CreateRefundResponseData = {
  refundId: string;
  refundedTransactionId: string;
  amount: number;
  currencyCode: EnumTranzakCurrency;
  status: "COMPLETED";
  type: "REFUND";
  merchantRefundRef: string;
  reasonDescription: string;
  isInitiatedByText: string;
  isCancelledByText: string;
  isApprovedByText: string;
  note: string;
  reasonCode: EnumTranzakReasonCode;
  createdAt: string;
  approvedAt: string;
};

export interface TranzakWebhookResponse<T> {
  name: string;
  version: string;
  eventType: EnumTranzakEventType;
  merchantId: string;
  appId: string;
  resourceId: string;
  resource: T;
  creationDateTime: string;
  webhookId: string;
  authKey: string;
}

export interface TranzakWebhookPaymentResource {
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
  transactionId?: string;
  transactionTime?: string;
  partnerTransactionId?: string;
  payer?: {
    isGuest: boolean;
    userId: string;
    name: string;
    paymentMethod: string;
    currencyCode: string;
    countryCode: string;
    accountId: string;
    accountName: string;
    email: string | null;
    amount: number;
    discount: number;
    fee: number;
    netAmountPaid: number;
  };
  merchant?: {
    currencyCode: string;
    amount: number;
    fee: number;
    netAmountReceived: number;
    accountId: string;
  };
  links: {
    returnUrl: string;
    cancelUrl: string;
  };
  errorCode?: number;
  errorMessage?: string;
}

export interface TranzakWebhookRefundResource {
  refundId: string;
  refundedTransactionId: string;
  serviceId: string;
  amount: number;
  currencyCode: EnumTranzakCurrency;
  status: EnumTranzakRefundStatus;
  type: "REFUND";
  merchantRefundRef: string | null;
  reasonDescription: string;
  isInitiatedByText: string;
  isCancelledByText: string | null;
  isApprovedByText: string;
  note: string;
  reasonCode: EnumTranzakReasonCode;
  reason: string;
  createdAt: string;
  approvedAt: string;
}
