import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface User {
  _id: string;
  username: string;
  [key: string]: unknown;
}

export const create = (user: User): any => {
  const payload = { id: user._id, username: user.username };
  return jwt.sign(payload, process.env.JWT_SECRET as string, {});
};

export const verify = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  let token = req.headers.authorization;

  if (token) {
    token = token.slice(7, token.length);
    return jwt.verify(token, process.env.JWT_SECRET as string, (err) => {
      return err ? res.send(err) : next();
    });
  } else {
    return res.send({ auth: "failed" });
  }
};

export const decode = (token: string): any => {
  if (token) {
    token = token.slice(7, token.length);
    return jwt.verify(token, process.env.JWT_SECRET as string, (err) => {
      return err ? null : jwt.decode(token, { complete: true })?.payload;
    });
  } else {
    return null;
  }
};
