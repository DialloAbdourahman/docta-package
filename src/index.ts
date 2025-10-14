import "reflect-metadata";
import { LoggedInUserTokenData } from "./interfaces";

export * from "./errors";
export * from "./middleware";
export * from "./models";
export * from "./dto/input";
export * from "./dto/output";
export * from "./utils";
export * from "./config";
export * from "./interfaces";
export * from "./enums";

declare global {
  namespace Express {
    interface Request {
      currentUser?: LoggedInUserTokenData;
    }
  }
}
