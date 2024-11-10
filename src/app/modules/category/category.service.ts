import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategory = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};
const getAllCategories = async () => {
  const result = await Category.find({ isDeleted: { $ne: true } });
  return result;
};
const updateCategories = async (id: string, payload: TCategory) => {
  const result = await Category.findByIdAndUpdate(
    id,
    { $set: { ...payload } },
    { new: true, upsert: true }
  );
  return result;
};

export const categoryServices = {
  createCategory,
  getAllCategories,
  updateCategories,
};
