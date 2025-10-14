import jwt, { JwtPayload } from "jsonwebtoken";
import { LoggedInUserTokenData } from "../interfaces";
import { generalConfig } from "../config";

export class TokenUtils {
  static createActivationToken(userId: string): string {
    return jwt.sign({ userId }, generalConfig.accessTokenSecret);
  }

  static decodeActivationToken(token: string): string | null {
    try {
      const decoded = jwt.verify(token, generalConfig.activationTokenSecret) as
        | JwtPayload
        | string;
      if (typeof decoded === "string") {
        return null;
      }
      return typeof decoded.userId === "string" ? decoded.userId : null;
    } catch {
      return null;
    }
  }

  static createAccessToken(payload: LoggedInUserTokenData): string {
    console.log("General config");
    console.log(generalConfig.accessTokenExpiry);
    return jwt.sign(payload, generalConfig.accessTokenSecret, {
      expiresIn: generalConfig.accessTokenExpiry,
    });
  }

  static createRefreshToken(payload: LoggedInUserTokenData): string {
    return jwt.sign(payload, generalConfig.refreshTokenSecret, {
      expiresIn: generalConfig.refreshTokenExpiry,
    });
  }

  static verifyRefreshToken(token: string): LoggedInUserTokenData | null {
    try {
      const decoded = jwt.verify(
        token,
        generalConfig.refreshTokenSecret
      ) as JwtPayload;
      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
    } catch {
      return null;
    }
  }

  static verifyAccessToken(token: string): LoggedInUserTokenData {
    try {
      const decoded = jwt.verify(
        token,
        generalConfig.accessTokenSecret
      ) as JwtPayload;
      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
    } catch (error) {
      throw error;
    }
  }

  static createForgotPasswordToken(userId: string): string {
    return jwt.sign({ userId }, generalConfig.forgotPasswordTokenSecret);
  }

  static decodeForgotPasswordToken(token: string): string | null {
    try {
      const decoded = jwt.verify(
        token,
        generalConfig.forgotPasswordTokenSecret
      ) as JwtPayload | string;
      if (typeof decoded === "string") {
        return null;
      }
      return typeof decoded.userId === "string" ? decoded.userId : null;
    } catch {
      return null;
    }
  }
}
