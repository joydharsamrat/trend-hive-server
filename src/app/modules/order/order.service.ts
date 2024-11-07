/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { ClientSession } from "mongoose";
import { Cart } from "../cart/cart.model";
import { Order } from "./order.model";
import AppError from "../../error/appError";
import httpStatus from "http-status";
import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";

const createOrder = async (payload: TOrder) => {
  const tran_id = `${Date.now()}${Math.floor(Math.random() * 100000)}`;
  const { billingInfo, price, user } = payload;

  const paymentData = {
    store_id: "aamarpaytest",
    signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
    tran_id,
    amount: price,
    currency: "USD",
    desc: "Test Payment",
    cus_name: billingInfo.name,
    cus_email: billingInfo.email,
    cus_phone: billingInfo.phone,
    success_url: "https://trend-hive-server.vercel.app/api/v1/order/success",
    fail_url: "https://trend-hive-server.vercel.app/api/v1/order/fail",
    cancel_url: "https://trend-hive-neon.vercel.app/",
    type: "json",
    opt_a: user,
    opt_b: billingInfo.address,
    opt_c: billingInfo.city,
    opt_d: billingInfo.state,
  };

  console.log(paymentData);

  try {
    const response = await fetch("https://sandbox.aamarpay.com/jsonpost.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error in payment API:", error);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to initiate payment slot"
    );
  }
};

const orderSuccess = async (payload: Record<string, unknown>) => {
  const session: ClientSession = await mongoose.startSession();

  try {
    session.startTransaction();
    const userId = payload.opt_a as string;
    const cartItems = await Cart.find({ user: userId })
      .populate("product", ["name", "image", "quantity"])
      .session(session);

    if (!cartItems.length) {
      throw new Error("No items found in the cart");
    }
    const orderData: TOrder = {
      billingInfo: {
        address: payload.opt_b as string,
        city: payload.opt_c as string,
        state: payload.opt_d as string,
        email: payload.cus_email as string,
        name: payload.cus_name as string,
        phone: payload.cus_phone as string,
      },
      items: cartItems as any,
      price: parseFloat(payload.amount as string),
      user: new mongoose.Types.ObjectId(userId),
    };

    for (const item of cartItems) {
      const product = item.product as any;
      const newQuantity = product.quantity - item.quantity;
      if (newQuantity < 0) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }
      await Product.updateOne(
        { _id: product._id },
        { $set: { quantity: newQuantity } }
      ).session(session);
    }

    const order = await Order.create([orderData], { session });

    await Cart.deleteMany({ user: userId }).session(session);

    await session.commitTransaction();
    session.endSession();

    return { data: order };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction failed:", error);
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to book order");
  }
};

export const orderServices = {
  createOrder,
  orderSuccess,
};
