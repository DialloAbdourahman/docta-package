import { EnumStatusCode } from "../enums";
import { ErrorResult } from "../utils";

export abstract class CustomError extends Error {
  public readonly code: EnumStatusCode;
  public readonly statusCode: number;

  constructor(message: string, code: EnumStatusCode, statusCode: number) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;

    // Maintains proper prototype chain for built-in Error
    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract serializeErrors(): ErrorResult;
}
