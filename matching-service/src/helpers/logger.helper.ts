import path from "path";
import "winston-daily-rotate-file";
import { createLogger, transports, format } from "winston";

// @ts-ignore
const rootPath = path.dirname(require.main.filename);

const transport = new transports.DailyRotateFile({
  filename: "application-%DATE%.log",
  dirname: "./logs",
  level: "info",
  handleExceptions: true,
  json: true,
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

transport.on("rotate", function () {
  // do something fun
});

/**
 * @const Logger
 * @property {LeveledLogMethod} info
 * @property {LeveledLogMethod} warn
 * @property {LeveledLogMethod} error
 * @property {LeveledLogMethod} debug
 */
const Logger = createLogger({
  transports: [transport],
});

Logger.add(
  new transports.Console({
    format: format.combine(format.colorize(), format.simple()),
    level: "debug",
  }),
);

/**
 * @const LoggerStream
 * @property {function(string)} write
 */
const LoggerStream = {
  write: (message: never) => {
    Logger.info(message);
  },
};

export { Logger, LoggerStream };
