import { model, Schema } from "mongoose";
import { TTest } from "./test.interface";

const testSchema = new Schema<TTest>({
  name: String,
});

export const Test = model<TTest>("test", testSchema);
