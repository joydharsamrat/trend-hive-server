import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

const handleGetUsers = catchAsync(async (req, res) => {
  const result = await userServices.getUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Users retrieved successfully",
    data: result,
  });
});

const handleMakeAdmin = catchAsync(async (req, res) => {
  const { id } = req.query;

  const result = await userServices.makeAdmin(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " User role updated successfully",
    data: result,
  });
});
const handleDeleteUser = catchAsync(async (req, res) => {
  const { id } = req.query;

  const result = await userServices.deleteUser(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " User deleted successfully",
    data: result,
  });
});

export const userControllers = {
  handleGetUsers,
  handleMakeAdmin,
  handleDeleteUser,
};
