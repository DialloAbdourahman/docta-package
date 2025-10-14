import { Schema } from "mongoose";
import { EnumLanguageLevel } from "../enums";

export interface ILanguage {
  title: string;
  level: EnumLanguageLevel;
}

export const LanguageSchema = new Schema<ILanguage>(
  {
    title: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: Object.values(EnumLanguageLevel),
      required: true,
      trim: true,
    },
  },
  { _id: false }
);
