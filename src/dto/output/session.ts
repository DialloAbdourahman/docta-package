import { ISessionDocument } from "../../models";
import { PeriodOutputDto } from "./period";
import { PatientOutputDto } from "./patient";
import { UserOutputDto } from "./user";
import { DoctorOutputDto } from "./doctor";

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
  status: string;

  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;

  constructor(session: ISessionDocument) {
    this.id = (session.id ?? session._id)?.toString();
    this.period = new PeriodOutputDto(session.period);
    this.status = session.status;

    this.isDeleted = session.isDeleted;
    this.createdAt = session.createdAt;
    this.updatedAt = session.updatedAt;
  }
}

// DTO for patients responses
export class SessionPatientOutputDto extends SessionOutputDto {
  pricing: {
    totalPrice: number;
    paymentApiPrice: number;
  };

  constructor(session: ISessionDocument) {
    super(session); // call base constructor
    this.pricing = {
      totalPrice: session.pricing.totalPrice,
      paymentApiPrice: session.pricing.paymentApiPrice,
    };
  }
}

// DTO for doctors responses
export class SessionDoctorOutputDto extends SessionOutputDto {
  patient: PatientOutputDto;
  price: number;

  constructor(session: ISessionDocument) {
    super(session); // call base constructor
    this.patient = new PatientOutputDto(session.patient);
    this.price = session.pricing.doctorPrice;
  }
}

// Extended DTO for admin responses
export class SessionAdminOutputDto extends SessionOutputDto {
  patient: PatientOutputDto;
  pricing: {
    totalPrice: number;
    doctorPrice: number;
    paymentApiPrice: number;
    platformPrice: number;
  };
  hasDoctorCollected: boolean;
  hasPlatformCollected: boolean;
  config: ISessionConfigOutput;
  createdBy: UserOutputDto | null;
  updatedBy: UserOutputDto | null;
  deletedBy: UserOutputDto | null;

  constructor(session: ISessionDocument) {
    super(session); // call base constructor

    this.patient = new PatientOutputDto(session.patient);
    this.pricing = {
      totalPrice: session.pricing.totalPrice,
      doctorPrice: session.pricing.doctorPrice,
      paymentApiPrice: session.pricing.paymentApiPrice,
      platformPrice: session.pricing.platformPrice,
    };
    this.hasDoctorCollected = session.hasDoctorCollected;
    this.hasPlatformCollected = session.hasPlatformCollected;
    this.config = {
      originalDoctorConsultationFeePerHour:
        session.meta.originalDoctorConsultationFeePerHour,
      platformPercentage: session.meta.platformPercentage,
      collectionPercentage: session.meta.collectionPercentage,
      disbursementPercentage: session.meta.disbursementPercentage,
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
