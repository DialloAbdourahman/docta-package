import { IExpertiseDocument } from "../../models";
import { UserOutputDto } from "./user";
import { normalizeId } from "../../utils/normalize.id";

// Base DTO for everyone
export class ExpertiseOutputDto {
  id: string | null;
  en: { name: string; description: string | null };
  fr: { name: string; description: string | null } | null;

  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;

  constructor(expertise: IExpertiseDocument) {
    this.id = normalizeId(expertise);
    this.en = {
      name: expertise.en.name,
      description: expertise.en.description || null,
    };
    this.fr = expertise.fr
      ? {
          name: expertise.fr.name,
          description: expertise.fr.description || null,
        }
      : null;
    this.isDeleted = expertise.isDeleted;
    this.createdAt = expertise.createdAt;
    this.updatedAt = expertise.updatedAt;
  }
}

// Extended DTO for admin responses
export class ExpertiseAdminOutputDto extends ExpertiseOutputDto {
  createdBy: UserOutputDto | null;
  updatedBy: UserOutputDto | null;
  deletedBy: UserOutputDto | null;

  constructor(expertise: IExpertiseDocument) {
    super(expertise); // call base constructor

    this.createdBy = expertise.createdBy
      ? new UserOutputDto(expertise.createdBy)
      : null;

    this.updatedBy = expertise.updatedBy
      ? new UserOutputDto(expertise.updatedBy)
      : null;

    this.deletedBy = expertise.deletedBy
      ? new UserOutputDto(expertise.deletedBy)
      : null;
  }
}
