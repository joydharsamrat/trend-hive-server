import httpStatus from "http-status";
import AppError from "../../error/appError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (query: Record<string, unknown>) => {
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

  if (query.minPrice && query.maxPrice) {
    searchQuery.find({
      price: { $gte: Number(query.minPrice), $lte: Number(query.maxPrice) },
    });
  }

  if (query.categories) {
    const categories: string[] = (query.categories as string).split(",");
    searchQuery.find({
      category: { $in: [...categories] },
    });
  }

  let sort: "asc" | "desc" = "desc";

  if (query.sort === "asc" || query.sort === "desc") {
    sort = query.sort;
  }

  const sortQuery = searchQuery
    .find({ isDeleted: { $ne: true } })
    .sort({ price: sort });

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 0;
  const skip = (page - 1) * limit;

  // Total count of matching products
  const totalProducts = await sortQuery.clone().countDocuments();

  // Fetch products with pagination
  const products = await sortQuery.limit(limit).skip(skip).populate("category");

  return {
    totalProducts,
    products,
  };
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
