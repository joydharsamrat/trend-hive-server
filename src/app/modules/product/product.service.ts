import httpStatus from "http-status";
import AppError from "../../error/appError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: TProduct) => {
  console.log(payload);
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (query: Record<string, unknown>) => {
  // search
  let searchTerm = "";

  if (query.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = Product.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  const excFields = [
    "searchTerm",
    "minPrice",
    "maxPrice",
    "sort",
    "page",
    "limit",
  ];
  const queryObj = { ...query };

  excFields.forEach((el) => delete queryObj[el]);

  // filtering based on prise range
  if (query.minPrice && query.maxPrice) {
    searchQuery.find({
      price: { $gte: Number(query.minPrice), $lte: Number(query.maxPrice) },
    });
  }

  // categories filtering

  if (query.categories) {
    const categories: string[] = (query.categories as string).split(",");
    searchQuery.find({
      category: { $in: [...categories] },
    });
  }

  // sorting

  let sort: "asc" | "desc" = "desc";

  if (query.sort === "asc" || query.sort === "desc") {
    sort = query.sort;
  }

  const sortQuery = searchQuery
    .find({ isDeleted: { $ne: true } })
    .sort({ price: sort });

  // pagination

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 0;
  const skip = (page - 1) * limit;

  const result = await sortQuery.limit(limit).skip(skip).populate("category");

  return result;
};

const getProductById = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateProduct = async (id: string, payload: Partial<TProduct>) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(httpStatus.FORBIDDEN, "Data not found");
  } else if (product.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "Product is deleted");
  }

  const result = await Product.findByIdAndUpdate(
    id,
    { $set: { ...payload } },
    { new: true }
  );

  return { data: result };
};

const deleteProduct = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(httpStatus.FORBIDDEN, "Data not found");
  } else if (product.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "Product is deleted");
  }

  const result = await Product.findByIdAndUpdate(
    id,
    { $set: { isDeleted: true } },
    { upsert: true, new: true }
  );

  return { data: result };
};

export const productServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
