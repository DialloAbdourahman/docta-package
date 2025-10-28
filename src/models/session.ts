import { Schema, model, Document, Model } from "mongoose";
import { BaseSchemaFields, BaseSchemaPlugin, IBaseModel } from "./base";
import { PeriodModel, IPeriodDocument } from "./period";
import { PatientModel, IPatientDocument } from "./patient";
import { SessionStatus } from "../enums/session.status";

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
 * Session interface
 */
export interface ISession extends IBaseModel {
  period: IPeriodDocument;
  patient: IPatientDocument;
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
  status: {
    type: String,
    enum: Object.values(SessionStatus),
    default: SessionStatus.Created,
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
});

SessionSchema.plugin(BaseSchemaPlugin);

export const SessionModel = model<ISessionDocument, ISessionModel>(
  "Session",
  SessionSchema
);
