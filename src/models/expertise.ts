import { Schema, model, Document, Model } from "mongoose";
import { BaseSchemaFields, BaseSchemaPlugin, IBaseModel } from "./base";

export interface ILocalizedExpertiseFields {
  name: string;
  description?: string | null;
}

export interface IExpertise extends IBaseModel {
  en: ILocalizedExpertiseFields;
  fr?: ILocalizedExpertiseFields;
}

export interface IExpertiseDocument extends IExpertise, Document {}

export interface IExpertiseModel extends Model<IExpertiseDocument> {}

const LocalizedFieldsSchema = new Schema<ILocalizedExpertiseFields>(
  {
    name: { type: String, required: true },
    description: { type: String, default: null },
  },
  { _id: false }
);

const ExpertiseSchema = new Schema<IExpertiseDocument>({
  ...BaseSchemaFields,
  en: { type: LocalizedFieldsSchema, required: true },
  fr: { type: LocalizedFieldsSchema, required: false, default: null },
});

ExpertiseSchema.plugin(BaseSchemaPlugin);

export const ExpertiseModel = model<IExpertiseDocument, IExpertiseModel>(
  "Expertise",
  ExpertiseSchema
);
