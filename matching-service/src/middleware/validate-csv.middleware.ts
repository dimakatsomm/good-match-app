import { Request, Response, NextFunction } from "express";
import { Logger } from "../helpers/logger.helper";

export default () => (req: Request, res: Response, next: NextFunction) => {
  const file: any = req.files?.csv || null;
  try {
    if (!file) {
      Logger.error("csv file must be uploaded");
      return res.status(400).json({ status: false, message: "csv file must be uploaded" });
    } else {
      const fileExt = file.mimetype.split("/")[1];
      if (fileExt != "csv") {
        Logger.error("File is not a csv type");
        return res.status(400).json({ status: false, message: "File is not a csv type" });
      }
    }
    next();
  } catch (err: any) {
    Logger.error(err.message);
    res.status(502).json({
      code: err.constructor.name,
      message: err.message,
    });
  }
};
