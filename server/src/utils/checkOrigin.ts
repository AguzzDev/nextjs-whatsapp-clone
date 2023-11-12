import { Request, Response, NextFunction } from "express";

export const checkOrigin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedOrigin = "localhost:3000";
  
  const host = req.get("host");
  
  if (host === allowedOrigin) {
    next();
  } else {
    res.status(500).send("Solicitud no autorizada");
  }
};
