import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TAuth } from "./auth.interface";
import bcrypt from "bcrypt";
import createToken from "./auth.utils";
import config from "../../config";
import { TUser } from "../user/user.interface";
import AppError from "../../error/appError";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const userSignUp = async (payload: TUser) => {
  const user = await User.create(payload);

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return { accessToken, refreshToken };
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
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return { accessToken, refreshToken };
};

const getAccessToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token_secret as string
  ) as JwtPayload;

  const user = await User.findOne(decoded.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found !");
  } else if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted !");
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_expires_in as string
  );

  return { token: accessToken };
};

export const authServices = { userSignUp, loginUser, getAccessToken };
