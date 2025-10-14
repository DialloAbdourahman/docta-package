import { EnumUserRole } from "../enums";

export interface LoggedInUserTokenData {
  id: string;
  email: string;
  role: EnumUserRole;
  //   doctorId?: string;
  //   patientId?: string;
}
