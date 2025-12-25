import { IRatingDocument } from "../../models/rating";
import { normalizeId } from "../../utils/normalize.id";
import { UserOutputDto } from "./user";

// Base DTO for everyone
export class RatingOutputDto {
  id: string | null;
  rating: number;
  message: string;

  doctorId: string | null;

  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;

  constructor(rating: IRatingDocument) {
    this.id = normalizeId(rating);
    this.rating = rating.rating;
    this.message = rating.message;

    this.doctorId = normalizeId(rating.doctor);
    this.isDeleted = rating.isDeleted;
    this.createdAt = rating.createdAt;
    this.updatedAt = rating.updatedAt;
  }
}

// Extended DTO for admin responses
export class RatingAdminOutputDto extends RatingOutputDto {
  sessionId: string | null;
  patientId: string | null;
  createdBy: UserOutputDto | null;
  updatedBy: UserOutputDto | null;
  deletedBy: UserOutputDto | null;

  constructor(rating: IRatingDocument) {
    super(rating); // call base constructor

    this.sessionId = normalizeId(rating.session);
    this.patientId = normalizeId(rating.patient);

    this.createdBy = rating.createdBy
      ? new UserOutputDto(rating.createdBy)
      : null;

    this.updatedBy = rating.updatedBy
      ? new UserOutputDto(rating.updatedBy)
      : null;

    this.deletedBy = rating.deletedBy
      ? new UserOutputDto(rating.deletedBy)
      : null;
  }
}
