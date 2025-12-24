import { IUserDocument } from "../../models";
import { normalizeId } from "../../utils/normalize.id";

export class UserPublicOutputDto {
  id: string | null;
  name: string;
  email: string;
  role: string;

  constructor(user: IUserDocument) {
    this.id = normalizeId(user);
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
  }
}

// Base DTO for everyone
export class UserOutputDto extends UserPublicOutputDto {
  isActive: boolean;
  timezone: string;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;

  constructor(user: IUserDocument) {
    super(user);
    this.isActive = user.isActive;
    this.timezone = user.timezone;
    this.isDeleted = user.isDeleted;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

// Extended DTO for admin responses
export class UserAdminOutputDto extends UserOutputDto {
  createdBy: UserOutputDto | null;
  updatedBy: UserOutputDto | null;
  deletedBy: UserOutputDto | null;

  constructor(user: IUserDocument) {
    super(user); // call base constructor

    this.createdBy = user.createdBy ? new UserOutputDto(user.createdBy) : null;
    this.updatedBy = user.updatedBy ? new UserOutputDto(user.updatedBy) : null;
    this.deletedBy = user.deletedBy ? new UserOutputDto(user.deletedBy) : null;
  }
}

// DTO for logged-in user responses
export class LoggedInUserOutputDto {
  user: UserOutputDto | UserAdminOutputDto;
  accessToken: string;
  refreshToken: string;

  constructor(
    user: UserOutputDto | UserAdminOutputDto,
    accessToken: string,
    refreshToken: string
  ) {
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
