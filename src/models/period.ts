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

/////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Validates that the difference between startTime and endTime
 * is one of [15, 30, 60, 90, 120] minutes and startTime < endTime.
 */
// function isValidTimeGap(startTime: number, endTime: number): boolean {
//     // Ensure startTime < endTime
//     if (endTime <= startTime) return false;

//     // Allowed gaps in minutes
//     const allowedGaps = [15, 30, 60, 90, 120];

//     // Convert milliseconds to minutes
//     const diffInMinutes = (endTime - startTime) / (1000 * 60);

//     // Check if difference matches any allowed gap
//     return allowedGaps.includes(diffInMinutes);
//   }

/////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Checks if a given period overlaps with any existing period for a doctor.
 * Returns true if overlap exists, false otherwise.
 */
// export async function checkPeriodOverlap(
//     doctorId: string | Types.ObjectId,
//     startTime: number,
//     endTime: number
//   ): Promise<boolean> {
//     const overlappingPeriod = await PeriodModel.findOne({
//       doctor: doctorId,
//       $or: [
//         {
//           // New start is inside an existing period
//           startTime: { $lte: startTime },
//           endTime: { $gt: startTime },
//         },
//         {
//           // New end is inside an existing period
//           startTime: { $lt: endTime },
//           endTime: { $gte: endTime },
//         },
//         {
//           // New period fully covers an existing one
//           startTime: { $gte: startTime },
//           endTime: { $lte: endTime },
//         },
//       ],
//     });

//     return !!overlappingPeriod;
//   }
