import { testServices } from "./test.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchasync";

const handleCreateTest = catchAsync(async (req, res) => {
  const result = await testServices.createTest(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Test created successfully",
    data: result,
  });
});

export const testControllers = {
  handleCreateTest,
};
