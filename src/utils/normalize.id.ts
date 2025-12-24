import mongoose from "mongoose";

export function normalizeId(value: any) {
  if (!value) return null;

  // populated doc → {_id: ObjectId}
  if (typeof value === "object" && value._id) {
    return normalizeId(value._id);
  }

  // ObjectId
  if (value instanceof mongoose.Types.ObjectId) {
    return value.toString();
  }

  // already a string
  if (typeof value === "string") {
    return value;
  }

  return null;
}
