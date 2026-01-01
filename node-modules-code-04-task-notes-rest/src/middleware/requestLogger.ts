import pinoHttp from "pino-http";
import { randomUUID } from "crypto";
import { logger } from "../utils/logger";

export const requestLogger = pinoHttp({
  logger,
  genReqId: () => randomUUID(),
  customSuccessMessage: function (req, _res) {
    return `${req.method} ${req.url} completed`;
  },
  customErrorMessage: function (req, _res, _err) {
    return `${req.method} ${req.url} errored`;
  },
});
