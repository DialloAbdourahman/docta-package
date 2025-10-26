import { Schema, model, Document, Model } from "mongoose";
import { EnumUserRole } from "../enums";
const bcrypt = require("bcryptjs");
import { IBaseModel, BaseSchemaFields, BaseSchemaPlugin } from "./base";

export interface IUser extends IBaseModel {
  role: EnumUserRole;
  name: string;
  email: string;
  password?: string;
  activationToken?: string | null;
  forgotPasswordToken?: string | null;
  token?: string | null;
  isActive: boolean;
  timezone: string;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  // toto(): void;
}

const UserSchema = new Schema<IUserDocument>({
  ...BaseSchemaFields,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: false, default: null },
  activationToken: { type: String, default: null },
  forgotPasswordToken: { type: String, default: null },
  token: { type: String, default: null },
  isActive: { type: Boolean, default: false },
  timezone: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(EnumUserRole),
    default: EnumUserRole.PATIENT,
  },
});

UserSchema.plugin(BaseSchemaPlugin);

UserSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error as Error);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<IUserDocument, IUserModel>("User", UserSchema);

// const tot = async (): Promise<IUserDocument[]> => {
//   const user: IUserDocument[] = await UserModel.find({});
//   return user;
// };
