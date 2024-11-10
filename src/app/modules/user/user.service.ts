import { TUser } from "./user.interface";
import { User } from "./user.model";

const getUsers = async () => {
  const result = await User.find({ isDeleted: false });
  return { data: result };
};

const makeAdmin = async (id: string) => {
  const result = await User.findByIdAndUpdate(id, { $set: { role: "admin" } });
  return { data: result };
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndUpdate(id, {
    $set: { isDeleted: true },
  });
  return { data: result };
};

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return { data: result };
};

export const userServices = {
  getUsers,
  makeAdmin,
  deleteUser,
  createUser,
};
