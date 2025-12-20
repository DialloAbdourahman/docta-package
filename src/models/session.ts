import { Schema, model, Document, Model } from "mongoose";
import { BaseSchemaFields, BaseSchemaPlugin, IBaseModel } from "./base";
import { PeriodModel, IPeriodDocument } from "./period";
import { PatientModel, IPatientDocument } from "./patient";
import { SessionStatus } from "../enums/session.status";
import { DoctorModel, IDoctorDocument } from "./doctor";
import {
  EnumTranzakPaymentStatus,
  EnumTranzakCurrency,
  EnumTranzakRefundStatus,
} from "../enums/tranzak";
import { EnumRefundStatus } from "../enums/refund.status";

/**
 * Interface for session configuration percentages
 */
export interface ISessionConfig {
  originalDoctorConsultationFeePerHour: number;
  platformPercentage: number;
  collectionPercentage: number; // e.g. percentage for Tranzak
  disbursementPercentage: number; // e.g. platform commission
}

/**
 * Interface for embedded payment data
 */
export interface ISessionPayment {
  transactionId?: string;
  transactionTime?: string;
  webhookStatus: EnumTranzakPaymentStatus;
  webhookId: string;
  amount: number;
  currency: EnumTranzakCurrency;
}

/**
 * Interface for embedded refund data
 */
export interface ISessionRefund {
  webhookId?: string;
  webhookStatus?: EnumTranzakRefundStatus;
  refundId?: string;
  refundedTransactionId?: string;
  currency?: EnumTranzakCurrency;
  serviceId?: string;
  reason?: string;
  refundStartedAt?: number;
  refundCompletedAt?: number;
  refundFailedAt?: number;
  status: EnumRefundStatus;
}

/**
 * Session interface
 */
export interface ISession extends IBaseModel {
  period: IPeriodDocument;
  patient: IPatientDocument;
  doctor: IDoctorDocument;
  status: SessionStatus;
  pricing: {
    totalPrice: number;
    doctorPrice: number;
    paymentApiPrice: number;
    platformPrice: number;
  };
  hasDoctorCollected: boolean;
  hasPlatformCollected: boolean;
  meta: ISessionConfig;
  payment?: ISessionPayment;
  refund?: ISessionRefund;
  tranzakErrorDetails?: {
    errorCode: string;
    errorMessage: string;
  };
}

/**
 * Document + Model interfaces
 */
export interface ISessionDocument extends ISession, Document {}
export interface ISessionModel extends Model<ISessionDocument> {}

/**
 * Schema definition
 */
const SessionSchema = new Schema<ISessionDocument>({
  ...BaseSchemaFields,

  period: {
    type: Schema.Types.ObjectId,
    ref: PeriodModel.modelName,
    required: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: PatientModel.modelName,
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: DoctorModel.modelName,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(SessionStatus),
    default: SessionStatus.CREATED,
    required: true,
  },
  pricing: {
    totalPrice: { type: Number, required: true },
    doctorPrice: { type: Number, required: true },
    platformPrice: { type: Number, required: true },
    paymentApiPrice: { type: Number, required: true },
  },
  meta: {
    originalDoctorConsultationFeePerHour: { type: Number, required: true },
    platformPercentage: { type: Number, required: true },
    collectionPercentage: { type: Number, required: true },
    disbursementPercentage: { type: Number, required: true },
  },
  hasDoctorCollected: { type: Boolean, required: true, default: false },
  hasPlatformCollected: { type: Boolean, required: true, default: false },
  payment: {
    transactionId: { type: String, required: false },
    transactionTime: { type: String, required: false },
    webhookStatus: {
      type: String,
      enum: Object.values(EnumTranzakPaymentStatus),
      required: false,
    },
    webhookId: { type: String, required: false },
    amount: { type: Number, required: false },
    currency: {
      type: String,
      enum: Object.values(EnumTranzakCurrency),
      required: false,
    },
  },
  refund: {
    webhookId: { type: String, required: false },
    webhookStatus: {
      type: String,
      enum: Object.values(EnumTranzakRefundStatus),
      required: false,
    },
    refundId: { type: String, required: false },
    refundedTransactionId: { type: String, required: false },
    currency: {
      type: String,
      enum: Object.values(EnumTranzakCurrency),
      required: false,
    },
    serviceId: { type: String, required: false },
    reason: { type: String, required: false },
    refundStartedAt: { type: Number, required: false },
    refundCompletedAt: { type: Number, required: false },
    refundFailedAt: { type: Number, required: false },
    status: {
      type: String,
      enum: Object.values(EnumRefundStatus),
      required: false,
    },
  },
  tranzakErrorDetails: {
    errorCode: { type: String, required: false },
    errorMessage: { type: String, required: false },
  },
});

SessionSchema.plugin(BaseSchemaPlugin);

export const SessionModel = model<ISessionDocument, ISessionModel>(
  "Session",
  SessionSchema
);
