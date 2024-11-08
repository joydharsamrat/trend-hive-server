import { Types } from "mongoose";

export type BillingInfo = {
  address: string;
  city: string;
  state: string;
  email: string;
  name: string;
  phone: string;
};

export type Product = {
  _id: Types.ObjectId;
  name: string;
  image: string;
  quantity: number;
};

export type CartItem = {
  _id: Types.ObjectId;
  product: Product;
  quantity: number;
};

export type TOrder = {
  billingInfo: BillingInfo;
  items: CartItem[];
  price: number;
  user: Types.ObjectId;
  status?: "pending" | "delivered" | "canceled";
};
