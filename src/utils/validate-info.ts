import { EnumStatusCode } from "../enums";
import { NotFoundError } from "../errors";
import { UnAuthorizedError } from "../errors";
import { IDoctorDocument, IUserDocument } from "../models";

export class ValidateInfo {
  static validateUser(user: IUserDocument): void {
    if (!user) {
      throw new NotFoundError(EnumStatusCode.USER_NOT_FOUND, "User not found");
    }

    if (user.isDeleted) {
      throw new UnAuthorizedError(
        EnumStatusCode.ACCOUNT_DELETED,
        "Your account has been deleted"
      );
    }

    if (!user.isActive) {
      throw new UnAuthorizedError(
        EnumStatusCode.ACCOUNT_DEACTIVATED,
        "Account is deactivated"
      );
    }
  }

  static validateDoctor(doctor: IDoctorDocument): void {
    if (!doctor) {
      throw new NotFoundError(
        EnumStatusCode.DOCTOR_NOT_FOUND,
        "Doctor not found"
      );
    }

    if (doctor.isDeleted) {
      throw new UnAuthorizedError(
        EnumStatusCode.ACCOUNT_DELETED,
        "Your account has been deleted"
      );
    }

    if (!doctor.isActive) {
      throw new UnAuthorizedError(
        EnumStatusCode.DOCTOR_DEACTIVATED,
        "Account is deactivated"
      );
    }
  }
}
