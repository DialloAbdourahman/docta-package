import { ISessionDocument } from "../../models";
import { PeriodOutputDto } from "./period";
import { PatientOutputDto } from "./patient";
import { UserOutputDto } from "./user";

// Interface for session configuration output
interface ISessionConfigOutput {
  originalDoctorConsultationFeePerHour: number;
  platformPercentage: number;
  collectionPercentage: number;
  disbursementPercentage: number;
}

// Base DTO for everyone
export class SessionOutputDto {
  id: string;
  period: PeriodOutputDto;
  patient: PatientOutputDto;
  status: string;

  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;

  constructor(session: ISessionDocument) {
    this.id = session.id.toString();
    this.period = new PeriodOutputDto(session.period);
    this.patient = new PatientOutputDto(session.patient);
    this.status = session.status;

    this.isDeleted = session.isDeleted;
    this.createdAt = session.createdAt;
    this.updatedAt = session.updatedAt;
  }
}

// DTO for patients responses
export class SessionPatientOutputDto extends SessionOutputDto {
  price: number;

  constructor(session: ISessionDocument) {
    super(session); // call base constructor
    this.price = session.totalPrice;
  }
}

// DTO for doctors responses
export class SessionDoctorOutputDto extends SessionOutputDto {
  price: number;

  constructor(session: ISessionDocument) {
    super(session); // call base constructor
    this.price = session.doctorPrice;
  }
}

// Extended DTO for admin responses
export class SessionAdminOutputDto extends SessionOutputDto {
  totalPrice: number;
  doctorPrice: number;
  paymentApiPrice: number;
  platformPrice: number;
  hasDoctorCollected: boolean;
  hasPlatformCollected: boolean;
  config: ISessionConfigOutput;
  createdBy: UserOutputDto | null;
  updatedBy: UserOutputDto | null;
  deletedBy: UserOutputDto | null;

  constructor(session: ISessionDocument) {
    super(session); // call base constructor

    this.totalPrice = session.totalPrice;
    this.doctorPrice = session.doctorPrice;
    this.paymentApiPrice = session.paymentApiPrice;
    this.platformPrice = session.platformPrice;
    this.hasDoctorCollected = session.hasDoctorCollected;
    this.hasPlatformCollected = session.hasPlatformCollected;
    this.config = {
      originalDoctorConsultationFeePerHour:
        session.config.originalDoctorConsultationFeePerHour,
      platformPercentage: session.config.platformPercentage,
      collectionPercentage: session.config.collectionPercentage,
      disbursementPercentage: session.config.disbursementPercentage,
    };

    this.createdBy = session.createdBy
      ? new UserOutputDto(session.createdBy)
      : null;

    this.updatedBy = session.updatedBy
      ? new UserOutputDto(session.updatedBy)
      : null;

    this.deletedBy = session.deletedBy
      ? new UserOutputDto(session.deletedBy)
      : null;
  }
}
