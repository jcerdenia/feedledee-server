import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface User {
  _id: string;
  email: string;
  [key: string]: unknown;
}

const secret = "Feedledee";

export const create = (user: User): any => {
  const payload = { id: user._id, email: user.email };
  return jwt.sign(payload, secret, {});
};

export const verify = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  let token = req.headers.authorization;

  if (token) {
    token = token.slice(7, token.length);
    return jwt.verify(token, secret, (err) => {
      return err ? res.send(err) : next();
    });
  } else {
    return res.send({ auth: "failed" });
  }
};

export const decode = (token: string): any => {
  if (token) {
    token = token.slice(7, token.length);
    return jwt.verify(token, secret, (err) => {
      return err ? null : jwt.decode(token, { complete: true })?.payload;
    });
  } else {
    return null;
  }
};
