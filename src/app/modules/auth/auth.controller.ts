import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import config from "../../config";

const handleUserSignUp = catchAsync(async (req, res) => {
  const result = await authServices.userSignUp(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_ENV === "production",
    httpOnly: true,
  });
  res.cookie("accessToken", accessToken, {
    secure: config.node_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: { accessToken, refreshToken },
  });
});

const handleUserLogin = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_ENV === "production",
    httpOnly: true,
  });
  res.cookie("accessToken", accessToken, {
    secure: config.node_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: { accessToken, refreshToken },
  });
});

const handleGetAccessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await authServices.getAccessToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token retrieved successfully",
    data: result,
  });
});

export const authControllers = {
  handleUserSignUp,
  handleUserLogin,
  handleGetAccessToken,
};
