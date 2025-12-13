import { EnumRefundDirection } from "../../enums/refund.direction";

export type InitiateRefundEvent = {
  sessionId: string;
  doctorId: string;
  patientId: string;
  refundDirection: EnumRefundDirection;
};
