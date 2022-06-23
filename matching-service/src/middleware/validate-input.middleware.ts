import { Request, Response, NextFunction } from "express";
import { Logger } from "../helpers/logger.helper";

export default () => (req: Request, res: Response, next: NextFunction) => {
  const reqBody = req.body;

  try {
    if (!reqBody) {
      Logger.error("A request body is required!");
      return res.status(400).json({ status: false, message: "A request body is required!" });
    } else if (!(reqBody.nameOne && reqBody.nameTwo)) {
      Logger.error("Both nameOne and nameTwo are required!");
      return res.status(400).json({ status: false, message: "Both nameOne and nameTwo are required!" });
    } else if (!(/^[a-zA-Z]+$/.test(reqBody.nameOne) && /^[a-zA-Z]+$/.test(reqBody.nameTwo))) {
      Logger.error("Both nameOne and nameTwo must be words!");
      return res.status(400).json({ status: false, message: "Both nameOne and nameTwo must be words!" });
    }
    next();
  } catch (err: any) {
    Logger.error(err.message);
    res.status(err.statusCode).json({
      code: err.constructor.name,
      message: err.message,
    });
  }
};
