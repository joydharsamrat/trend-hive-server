import { TOrder } from "./order.interface";

const createOrder = async (payload: TOrder) => {
  const tran_id = `${Date.now()}${Math.random()}`;
  const { billingInfo, price } = payload;

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
    success_url: "https://auto-shine-server.vercel.app/api/v1/payment/success",
    fail_url: "https://auto-shine-server.vercel.app/api/v1/payment/fail",
    cancel_url: "https://auto-shine.vercel.app/",
    type: "json",
    opt_a: JSON.stringify(payload), // Serialize and add payload here
  };

  const response = await fetch("https://sandbox.aamarpay.com/jsonpost.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  const data = await response.json();

  return { data };
};

const orderSuccess = async (payload: Record<string, unknown>) => {
  console.log(payload);
};

export const orderServices = {
  createOrder,
  orderSuccess,
};
