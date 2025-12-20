// // src/utils/logger.ts
// import winston from "winston";
// import "winston-daily-rotate-file";
// import path from "path";
// import fs from "fs";

// const logDir = path.join(process.cwd(), "logs");

// // ensure logs directory exists
// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir, { recursive: true });
// }

// const transport = new winston.transports.DailyRotateFile({
//   dirname: logDir,
//   filename: "%DATE%.log",
//   datePattern: "YYYY-MM-DD",
//   zippedArchive: false,
//   maxSize: "20m",
//   maxFiles: "14d",
// });

// export const logger = winston.createLogger({
//   level: "error",
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     transport,
//     new winston.transports.Console({ format: winston.format.simple() }), // optional
//   ],
// });

/////////////////////////

import winston from "winston";
import "winston-daily-rotate-file";
import path from "path";
import fs from "fs";

const errorLogDir = path.join(process.cwd(), "logs/error");
const debugLogDir = path.join(process.cwd(), "logs/debug");

// ensure logs directories exist
for (const dir of [errorLogDir, debugLogDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * ERROR → file
 */
const errorTransport = new winston.transports.DailyRotateFile({
  level: "error",
  dirname: errorLogDir,
  filename: "%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d",
});

/**
 * DEBUG → file
 */
const debugTransport = new winston.transports.DailyRotateFile({
  level: "debug",
  dirname: debugLogDir,
  filename: "%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "7d",
});

/**
 * INFO / WARN / ERROR / DEBUG → console (CloudWatch)
 */
const consoleTransport = new winston.transports.Console({
  level: "debug", // allow everything to console
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `[${timestamp}] ${level}: ${message}${
        Object.keys(meta).length ? " " + JSON.stringify(meta) : ""
      }`;
    })
  ),
});

export const logger = winston.createLogger({
  level: "debug", // minimum accepted level
  transports: [consoleTransport, errorTransport, debugTransport],
});
