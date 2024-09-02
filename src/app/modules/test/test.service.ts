import { TTest } from "./test.interface";
import { Test } from "./test.model";

const createTest = async (payload: TTest) => {
  const result = Test.create(payload);
  return result;
};

export const testServices = {
  createTest,
};
