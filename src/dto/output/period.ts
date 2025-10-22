import { IPeriodDocument } from "../../models";
import { DoctorOutputDto } from "./doctor";
import { UserOutputDto } from "./user";
import { PeriodStatus } from "../../enums/period.status";

// Base DTO for everyone
export class PeriodOutputDto {
  id: string;
  doctor: DoctorOutputDto;
  startTime: number;
  endTime: number;
  status: PeriodStatus;

  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;

  constructor(period: IPeriodDocument) {
    this.id = period.id.toString();
    this.doctor = new DoctorOutputDto(period.doctor);
    this.startTime = period.startTime;
    this.endTime = period.endTime;
    this.status = period.status;
    this.isDeleted = period.isDeleted;
    this.createdAt = period.createdAt;
    this.updatedAt = period.updatedAt;
  }
}

// Extended DTO for admin responses
export class PeriodAdminOutputDto extends PeriodOutputDto {
  createdBy: UserOutputDto | null;
  updatedBy: UserOutputDto | null;
  deletedBy: UserOutputDto | null;

  constructor(period: IPeriodDocument) {
    super(period); // call base constructor

    this.createdBy = period.createdBy
      ? new UserOutputDto(period.createdBy)
      : null;

    this.updatedBy = period.updatedBy
      ? new UserOutputDto(period.updatedBy)
      : null;

    this.deletedBy = period.deletedBy
      ? new UserOutputDto(period.deletedBy)
      : null;
  }
}
