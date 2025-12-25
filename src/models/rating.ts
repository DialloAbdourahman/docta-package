import { Schema, model, Document, Model } from "mongoose";
import { BaseSchemaFields, BaseSchemaPlugin, IBaseModel } from "./base";
import { EnumRatingValue } from "../enums/rating";
import { PatientModel, IPatientDocument } from "./patient";
import { DoctorModel, IDoctorDocument } from "./doctor";
import { SessionModel, ISessionDocument } from "./session";

/**
 * Rating interface
 */
export interface IRating extends IBaseModel {
  rating: EnumRatingValue;
  message: string;
  session: ISessionDocument;
  patient: IPatientDocument;
  doctor: IDoctorDocument;
}

/**
 * Document + Model interfaces
 */
export interface IRatingDocument extends IRating, Document {}
export interface IRatingModel extends Model<IRatingDocument> {}

/**
 * Schema definition
 */
const RatingSchema = new Schema<IRatingDocument>({
  ...BaseSchemaFields,

  rating: {
    type: Number,
    enum: Object.values(EnumRatingValue),
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: SessionModel.modelName,
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
});

RatingSchema.plugin(BaseSchemaPlugin);

export const RatingModel = model<IRatingDocument, IRatingModel>(
  "Rating",
  RatingSchema
);
