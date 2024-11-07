import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";
import { TUserRole } from "../modules/user/user.interface";
import AppError from "../error/appError";

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User is unauthorized");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_token_secret as string
    ) as JwtPayload;

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    } else if (!roles.includes(decoded.role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User is unauthorized");
    }

    req.user = decoded;

    next();
  });
};

export default auth;
