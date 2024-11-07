import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TAuth } from "./auth.interface";
import bcrypt from "bcrypt";
import createToken from "./auth.utils";
import config from "../../config";
import { TUser } from "../user/user.interface";
import AppError from "../../error/appError";

const userSignUp = async (payload: TUser) => {
  const result = await User.create(payload);
  return { data: result };
};

const loginUser = async (payload: TAuth) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect !");
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    "1d"
  );

  user.password = "";

  return { token, data: user };
};

export const authServices = { userSignUp, loginUser };
