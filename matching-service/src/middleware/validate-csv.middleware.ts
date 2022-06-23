import { Request, Response, NextFunction } from "express";

export default () => (req: Request, res: Response, next: NextFunction) => {
  const file: any = req.files?.csv || null;
  try {
    if (!file) {
      return res.status(400).json({ status: false, message: "csv file must be uploaded" });
    } else {
      const fileExt = file.mimetype.split("/")[1];
      if (fileExt != "csv") {
        return res.status(400).json({ status: false, message: "File is not a csv type" });
      }
    }
    next();
  } catch (err: any) {
    res.status(502).json({
      code: err.constructor.name,
      message: err.message,
    });
  }
};
