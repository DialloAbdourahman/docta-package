import jwt, { JwtPayload } from "jsonwebtoken";
import { LoggedInUserTokenData } from "../interfaces";
import { getGeneralConfig } from "../config";

export class TokenUtils {
  static createActivationToken(userId: string): string {
    return jwt.sign({ userId }, getGeneralConfig().accessTokenSecret);
  }

  static decodeActivationToken(token: string): string | null {
    try {
      const decoded = jwt.verify(
        token,
        getGeneralConfig().activationTokenSecret
      ) as JwtPayload | string;
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
    console.log(getGeneralConfig());
    return jwt.sign(payload, getGeneralConfig().accessTokenSecret, {
      expiresIn: getGeneralConfig().accessTokenExpiry,
    });
  }

  static createRefreshToken(payload: LoggedInUserTokenData): string {
    return jwt.sign(payload, getGeneralConfig().refreshTokenSecret, {
      expiresIn: getGeneralConfig().refreshTokenExpiry,
    });
  }

  static verifyRefreshToken(token: string): LoggedInUserTokenData | null {
    try {
      const decoded = jwt.verify(
        token,
        getGeneralConfig().refreshTokenSecret
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
        getGeneralConfig().accessTokenSecret
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
    return jwt.sign({ userId }, getGeneralConfig().forgotPasswordTokenSecret);
  }

  static decodeForgotPasswordToken(token: string): string | null {
    try {
      const decoded = jwt.verify(
        token,
        getGeneralConfig().forgotPasswordTokenSecret
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
