import "express-session";
import type { CartItem, UserType } from "../types.js";

declare module "express-session" {
  interface SessionData {
    uid?: string;
    userTypeId?: UserType;
    cart?: CartItem[];
  }
}
