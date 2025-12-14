import { EnumTranzakCurrency, EnumTranzakReasonCode } from "../enums/tranzak";

export type TranzakCreatePaymentSessionRequestDto = {
  amount: number;
  currencyCode: EnumTranzakCurrency;
  description: string;
  mchTransactionRef: string;
  returnUrl: string;
  cancelUrl: string;
};

export type TranzakCreateRefundRequestDto = {
  refundedTransactionId: string;
  reasonCode: EnumTranzakReasonCode;
  merchantRefundNumber: string;
  note?: string;
  amount?: number;
};
