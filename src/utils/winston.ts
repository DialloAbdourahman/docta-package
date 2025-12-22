// import winston from "winston";
// import "winston-daily-rotate-file";
// import path from "path";
// import fs from "fs";

// const errorLogDir = path.join(process.cwd(), "logs/error");

// // ensure logs directory exists
// if (!fs.existsSync(errorLogDir)) {
//   fs.mkdirSync(errorLogDir, { recursive: true });
// }

// /**
//  * ERROR → file
//  */
// const errorTransport = new winston.transports.DailyRotateFile({
//   level: "error",
//   dirname: errorLogDir,
//   filename: "%DATE%.log",
//   datePattern: "YYYY-MM-DD",
//   maxSize: "20m",
//   maxFiles: "14d",
// });

// /**
//  * INFO → console with request information
//  */
// const infoTransport = new winston.transports.Console({
//   level: "info",
//   format: winston.format.combine(
//     winston.format.colorize(),
//     winston.format.timestamp(),
//     winston.format.printf(
//       ({ timestamp, level, message, method, path, request_id, ...meta }) => {
//         let logMessage = `[${timestamp}] ${level}: ${message}`;

//         // Add request information if available
//         const requestInfo: string[] = [];
//         if (method) requestInfo.push(`method=${method}`);
//         if (path) requestInfo.push(`path=${path}`);
//         if (request_id) requestInfo.push(`request_id=${request_id}`);

//         if (requestInfo.length > 0) {
//           logMessage += ` | ${requestInfo.join(", ")}`;
//         }

//         // Add any remaining metadata
//         const remainingMeta = Object.keys(meta).filter(
//           (key) => key !== "timestamp"
//         );
//         if (remainingMeta.length > 0) {
//           const metaObj = remainingMeta.reduce(
//             (acc, key) => ({ ...acc, [key]: meta[key] }),
//             {}
//           );
//           logMessage += ` | meta=${JSON.stringify(metaObj)}`;
//         }

//         return logMessage;
//       }
//     )
//   ),
// });

// export const logger = winston.createLogger({
//   level: "info",
//   transports: [infoTransport, errorTransport],
// });

///////YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

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
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp()
  ),
});

/**
 * DEBUG ONLY → file
 */
const debugTransport = new winston.transports.DailyRotateFile({
  level: "debug",
  dirname: debugLogDir,
  filename: "%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "7d",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format((info) => (info.level === "debug" ? info : false))()
  ),
});

/**
 * CONSOLE → everything (CloudWatch)
 */
const consoleTransport = new winston.transports.Console({
  level: "debug",
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
  level: "debug",
  transports: [consoleTransport, errorTransport, debugTransport],
});
