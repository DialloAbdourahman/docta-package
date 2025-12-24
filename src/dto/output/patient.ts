import { Gender } from "../../enums";
import { IPatientDocument } from "../../models";
import { UserOutputDto, UserPublicOutputDto } from "./user";
import { normalizeId } from "../../utils/normalize.id";

class OutputDto {
  id: string | null;
  dob: number | null;
  phoneNumber: string | null;
  gender: Gender | null;

  constructor(patient: IPatientDocument) {
    this.id = normalizeId(patient);
    this.dob = patient.dob || null;
    this.phoneNumber = patient.phoneNumber || null;
    this.gender = patient.gender || null;
  }
}

export class PatientPublicOutputDto extends OutputDto {
  user: UserPublicOutputDto;

  constructor(patient: IPatientDocument) {
    super(patient);
    this.user = new UserPublicOutputDto(patient.user);
  }
}

// Base DTO for everyone
export class PatientOutputDto extends OutputDto {
  user: UserOutputDto;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;

  constructor(patient: IPatientDocument) {
    super(patient);
    this.user = new UserOutputDto(patient.user);
    this.isDeleted = patient.isDeleted;
    this.createdAt = patient.createdAt;
    this.updatedAt = patient.updatedAt;
  }
}

// Public patient DTO

// Extended DTO for admin responses
export class PatientAdminOutputDto extends PatientOutputDto {
  createdBy: UserOutputDto | null;
  updatedBy: UserOutputDto | null;
  deletedBy: UserOutputDto | null;

  constructor(patient: IPatientDocument) {
    super(patient); // call base constructor

    this.createdBy = patient.createdBy
      ? new UserOutputDto(patient.createdBy)
      : null;

    this.updatedBy = patient.updatedBy
      ? new UserOutputDto(patient.updatedBy)
      : null;

    this.deletedBy = patient.deletedBy
      ? new UserOutputDto(patient.deletedBy)
      : null;
  }
}
