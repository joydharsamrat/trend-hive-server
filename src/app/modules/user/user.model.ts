import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salts));
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("user", userSchema);
