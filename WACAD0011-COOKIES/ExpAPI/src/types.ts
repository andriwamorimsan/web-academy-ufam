export const UserTypes = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
} as const;

export type UserType = (typeof UserTypes)[keyof typeof UserTypes];

export interface Product {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateProductDto = Pick<Product, "name" | "price" | "stockQuantity">;
export type UpdateProductDto = CreateProductDto;

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  userTypeId: UserType;
  createdAt: string;
  updatedAt: string;
}

export type UserDto = Omit<User, "password">;
export type CreateUserDto = Pick<User, "name" | "email" | "userTypeId"> & {
  password: string;
};
export type SignUpDto = Pick<User, "name" | "email"> & { password: string };
export type LoginDto = Pick<User, "email"> & { password: string };
export type UpdateUserDto = Partial<CreateUserDto>;

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface PurchaseItem extends CartItem {
  productName: string;
  unitPrice: number;
  subtotal: number;
}

export interface Purchase {
  id: string;
  userId: string;
  items: PurchaseItem[];
  total: number;
  createdAt: string;
}
