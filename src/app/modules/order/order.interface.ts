import { Types } from "mongoose";

export type BillingInfo = {
  address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  name: string;
  phone: string;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type TOrder = {
  _id: string;
  billingInfo: BillingInfo;
  items: CartItem[];
  price: number;
  user: Types.ObjectId;
};
