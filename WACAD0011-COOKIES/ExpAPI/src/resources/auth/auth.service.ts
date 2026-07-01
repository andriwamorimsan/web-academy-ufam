import bcrypt from "bcryptjs";
import { LoginDto, User, UserTypes } from "../../types.js";
import { findUserByEmail, findUserById } from "../user/user.service.js";

export function checkAuth(credentials: LoginDto): User | null {
  const user = findUserByEmail(credentials.email);
  if (!user) return null;

  const ok = bcrypt.compareSync(credentials.password, user.password);
  return ok ? user : null;
}

export function checkIsAdmin(uid: string): boolean {
  const user = findUserById(uid);
  return user?.userTypeId === UserTypes.ADMIN;
}
