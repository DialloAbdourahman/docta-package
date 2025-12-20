import {
  ISessionDocument,
  ISessionPayment,
  ISessionRefund,
} from "../../models";
import { PeriodOutputDto } from "./period";
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
  status: string;
  doctorId: string | null;
  patientId: string | null;
  refund: ISessionRefund | null;
  paidAt: number | null;
  cancelledAt: number | null;

  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;

  constructor(session: ISessionDocument) {
    this.id = (session.id ?? session._id)?.toString();
    this.period = new PeriodOutputDto(session.period);
    this.status = session.status;
    this.doctorId =
      (session.doctor.id ?? session.doctor._id)?.toString() || null;
    this.patientId =
      (session.patient.id ?? session.patient._id)?.toString() || null;
    this.refund = session.refund || null;
    this.isDeleted = session.isDeleted;
    this.createdAt = session.createdAt;
    this.updatedAt = session.updatedAt;
    this.paidAt = session.paidAt || null;
    this.cancelledAt = session.cancelledAt || null;
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
  pricing: {
    doctorPrice: number;
  };

  constructor(session: ISessionDocument) {
    super(session); // call base constructor
    this.pricing = {
      doctorPrice: session.pricing.doctorPrice,
    };
  }
}

// Extended DTO for admin responses
export class SessionAdminOutputDto extends SessionOutputDto {
  pricing: {
    totalPrice: number;
    doctorPrice: number;
    paymentApiPrice: number;
    platformPrice: number;
  };
  hasDoctorCollected: boolean;
  hasPlatformCollected: boolean;
  config: ISessionConfigOutput;
  payment: ISessionPayment | null;
  createdBy: UserOutputDto | null;
  updatedBy: UserOutputDto | null;
  deletedBy: UserOutputDto | null;
  tranzakErrorDetails: {
    errorCode: number | null;
    errorMessage: string | null;
  } | null;

  constructor(session: ISessionDocument) {
    super(session); // call base constructor

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

    this.payment = session.payment || null;

    this.createdBy = session.createdBy
      ? new UserOutputDto(session.createdBy)
      : null;

    this.updatedBy = session.updatedBy
      ? new UserOutputDto(session.updatedBy)
      : null;

    this.deletedBy = session.deletedBy
      ? new UserOutputDto(session.deletedBy)
      : null;
    this.tranzakErrorDetails = session.tranzakErrorDetails
      ? {
          errorCode: session.tranzakErrorDetails.errorCode || null,
          errorMessage: session.tranzakErrorDetails.errorMessage || null,
        }
      : null;
  }
}
