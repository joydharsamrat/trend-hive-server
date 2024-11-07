import { Schema, model } from "mongoose";
import { BillingInfo, CartItem, TOrder } from "./order.interface";

const billingInfoSchema = new Schema<BillingInfo>({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

const cartItemSchema = new Schema<CartItem>({
  product: { type: Schema.ObjectId, required: true, ref: "Product" },
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
