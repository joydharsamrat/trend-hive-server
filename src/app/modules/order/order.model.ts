import { Schema, model } from "mongoose";
import { BillingInfo, CartItem, Product, TOrder } from "./order.interface";

const billingInfoSchema = new Schema<BillingInfo>({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

const productSchema = new Schema<Product>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const cartItemSchema = new Schema<CartItem>({
  product: { type: productSchema, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema<TOrder>(
  {
    billingInfo: { type: billingInfoSchema, required: true },
    items: { type: [cartItemSchema], required: true },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  {
    timestamps: true,
  }
);

export const Order = model<TOrder>("Order", orderSchema);
