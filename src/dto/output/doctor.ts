import { IDoctorDocument } from "../../models";
import { SpecialtyOutputDto } from "./specialty";
import { ExpertiseOutputDto } from "./expertise";
import { UserOutputDto, UserPublicOutputDto } from "./user";
import { EducationOutputDto } from "./education";
import { PositionOutputDto } from "./position";
import { LanguageOutputDto } from "./language";
import { FaqOutputDto } from "./faq";
import { LocationOutputDto } from "./location";
import { normalizeId } from "../../utils/normalize.id";

export class DoctorPublicOutputDto {
  id: string | null;
  specialty: SpecialtyOutputDto;
  title: string;
  professionalEmail: string;
  dontBookMeBeforeInMins: number;
  biography: string | null;
  slug: string;
  isActive: boolean;
  consultationFeePerHour: number | null;
  isVerified: boolean;
  isVisible: boolean;
  photo: string | null;
  educations: EducationOutputDto[];
  positions: PositionOutputDto[];
  languages: LanguageOutputDto[];
  faqs: FaqOutputDto[];
  expertises: ExpertiseOutputDto[];
  location: LocationOutputDto | null;

  constructor(doctor: IDoctorDocument) {
    this.id = normalizeId(doctor);
    this.title = doctor.title;
    this.professionalEmail = doctor.professionalEmail;
    this.dontBookMeBeforeInMins = doctor.dontBookMeBeforeInMins;
    this.specialty = new SpecialtyOutputDto(doctor.specialty);
    this.slug = doctor.slug;
    this.biography = doctor.biography || null;
    this.isActive = doctor.isActive;
    this.consultationFeePerHour = doctor.consultationFeePerHour ?? null;
    this.isVerified = doctor.isVerified;
    this.isVisible = doctor.isVisible;
    this.photo = doctor.photo || null;
    this.educations = (doctor.educations || [])
      .map((e) => new EducationOutputDto(e))
      .sort((a, b) => b.year - a.year);
    this.positions = (doctor.positions || [])
      .map((p) => new PositionOutputDto(p))
      .sort((a, b) => b.startDate - a.startDate);
    this.languages = (doctor.languages || []).map(
      (l) => new LanguageOutputDto(l)
    );
    this.faqs = (doctor.faqs || []).map((f) => new FaqOutputDto(f));
    this.expertises = (doctor.expertises || []).map(
      (e) => new ExpertiseOutputDto(e)
    );
    this.location = doctor.location
      ? new LocationOutputDto(doctor.location)
      : null;
  }
}

export class DoctorOutputDto extends DoctorPublicOutputDto {
  user: UserOutputDto;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;

  constructor(doctor: IDoctorDocument) {
    super(doctor);
    this.user = new UserOutputDto(doctor.user);
    this.isDeleted = doctor.isDeleted;
    this.createdAt = doctor.createdAt;
    this.updatedAt = doctor.updatedAt;
  }
}

// Extended DTO for admin responses
export class DoctorAdminOutputDto extends DoctorOutputDto {
  isDeactivatedByAdmin: boolean | null;
  createdBy: UserOutputDto | null;
  updatedBy: UserOutputDto | null;
  deletedBy: UserOutputDto | null;

  constructor(doctor: IDoctorDocument) {
    super(doctor); // call base constructor

    this.isDeactivatedByAdmin = doctor.isDeactivatedByAdmin ?? null;

    this.createdBy = doctor.createdBy
      ? new UserOutputDto(doctor.createdBy)
      : null;

    this.updatedBy = doctor.updatedBy
      ? new UserOutputDto(doctor.updatedBy)
      : null;

    this.deletedBy = doctor.deletedBy
      ? new UserOutputDto(doctor.deletedBy)
      : null;
  }
}
