import { Types } from "mongoose";

export type TProduct = {
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  category: Types.ObjectId;
};
