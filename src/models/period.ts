import { Schema, model, Document, Model } from "mongoose";
import { BaseSchemaFields, BaseSchemaPlugin, IBaseModel } from "./base";
import { IDoctorDocument, DoctorModel } from "./doctor";
import { PeriodStatus } from "../enums/period.status";

export interface IPeriod extends IBaseModel {
  doctor: IDoctorDocument;
  startTime: number;
  endTime: number;
  status: PeriodStatus;
}

export interface IPeriodDocument extends IPeriod, Document {}

export interface IPeriodModel extends Model<IPeriodDocument> {}

const PeriodSchema = new Schema<IPeriodDocument>({
  ...BaseSchemaFields,
  doctor: {
    type: Schema.Types.ObjectId,
    ref: DoctorModel.modelName,
    required: true,
  },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  status: {
    type: String,
    enum: Object.values(PeriodStatus),
    required: true,
    default: PeriodStatus.Available,
  },
});

PeriodSchema.plugin(BaseSchemaPlugin);

export const PeriodModel = model<IPeriodDocument, IPeriodModel>(
  "Period",
  PeriodSchema
);
