import mongoose from "mongoose";

export function normalizeId(value: any): string | null {
  if (!value) return null;

  // 1️⃣ Raw ObjectId (aggregation, normal query)
  if (value instanceof mongoose.Types.ObjectId) {
    return value.toString();
  }

  // 2️⃣ Already a string
  if (typeof value === "string") {
    return value;
  }

  // 3️⃣ Populated document or plain object with _id
  if (typeof value === "object" && value._id) {
    return normalizeId(value._id);
  }

  return null;
}
