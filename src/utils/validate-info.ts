import { EnumStatusCode } from "../enums";
import { NotFoundError } from "../errors";
import { UnAuthorizedError } from "../errors";
import { IUserDocument } from "../models";

export class ValidateInfo {
  static validateUser(user: IUserDocument): void {
    if (!user) {
      throw new NotFoundError(EnumStatusCode.NOT_FOUND, "User not found");
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
}
