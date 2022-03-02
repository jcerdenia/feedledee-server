import express from "express";
import * as UserController from "../controllers/user";
import * as token from "../helpers/token";
import { Request, Response } from "express";

const router = express.Router();

router.post("/register", (req: Request, res: Response): void => {
  UserController.register(req.body).then((result: any) => res.send(result));
});

router.post("/auth", (req: Request, res: Response): void => {
  UserController.auth(req.body).then((result: any) => res.send(result));
});

router.post(
  "/:username/subscribe",
  token.verify,
  (req: Request, res: Response) => {
    UserController.subscribe(req.params.username, req.body).then(
      (result: any) => res.send(result)
    );
  }
);

export default router;
