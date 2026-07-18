import { Request, Response } from "express";
import { verify } from "argon2";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import { signupUserType } from "../schema/User.schema";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const signupHandler = async (
  req: Request<unknown, unknown, signupUserType>,
  res: Response
) => {
  const { email, password, role } = req.body;

  const userFound = await userModel.findOne({ email });
  if (userFound)
    return res.status(400).json({ message: "User already exists" });

  const newUser = new userModel({ email, password, role });
  const savedUser = await newUser.save();

  jwt.sign(
    { id: savedUser._id, role: savedUser.role },
    JWT_SECRET,
    (err: any, token: any) => {
      if (err) throw err;
      res.status(200).json({ token, role: savedUser.role });
    }
  );
};

export const signinHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  const validPassword = await verify(user.password, password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid email or password" });

  jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    (err: any, token: any) => {
      if (err) throw err;
      res.status(200).json({ token, role: user.role });
    }
  );
};
