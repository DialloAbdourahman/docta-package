import { CustomError } from ".";
import { EnumStatusCode } from "../enums";
import { ErrorResult } from "../utils";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(
    code: EnumStatusCode = EnumStatusCode.NOT_FOUND,
    message: string = "Not Found"
  ) {
    super(message, code, 404);
  }

  serializeErrors(): ErrorResult {
    return { code: this.code, message: this.message };
  }
}
