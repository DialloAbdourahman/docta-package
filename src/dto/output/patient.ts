import { Gender } from "../../enums";
import { IPatientDocument } from "../../models";
import { UserOutputDto, UserPublicOutputDto } from "./user";

class BasePatientOutputDto {
  id: string;
  dob: number | null;
  phoneNumber: string | null;
  gender: Gender | null;

  constructor(patient: IPatientDocument) {
    this.id = (patient.id ?? patient._id)?.toString();
    this.dob = patient.dob || null;
    this.phoneNumber = patient.phoneNumber || null;
    this.gender = patient.gender || null;
  }
}

// Base DTO for everyone
export class PatientOutputDto extends BasePatientOutputDto {
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

export class PatientPublicOutputDto extends BasePatientOutputDto {
  user: UserPublicOutputDto;

  constructor(patient: IPatientDocument) {
    super(patient);
    this.user = new UserPublicOutputDto(patient.user);
  }
}

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
