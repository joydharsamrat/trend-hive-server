export interface TUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isDeleted?: boolean;
}

export type TUserRole = "admin" | "user";
