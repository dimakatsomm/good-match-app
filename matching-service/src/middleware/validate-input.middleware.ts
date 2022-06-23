import { Request, Response, NextFunction } from "express";

export default () => (req: Request, res: Response, next: NextFunction) => {
  const reqBody = req.body;

  try {
    if (!reqBody) {
      return res.status(400).json({ status: false, message: "A request body is required!" });
    } else if (!(reqBody.nameOne && reqBody.nameTwo)) {
      return res.status(400).json({ tatus: false, message: "Both nameOne and nameTwo are required!" });
    } else if (!(/^[a-zA-Z]+$/.test(reqBody.nameOne) && /^[a-zA-Z]+$/.test(reqBody.nameTwo))) {
      return res.status(400).json({ tatus: false, message: "Both nameOne and nameTwo must be words!" });
    }
    next();
  } catch (err: any) {
    res.status(err.statusCode).json({
      code: err.constructor.name,
      message: err.message,
    });
  }
};
