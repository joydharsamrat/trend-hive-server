export interface TUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export type TUserRole = "admin" | "user";
