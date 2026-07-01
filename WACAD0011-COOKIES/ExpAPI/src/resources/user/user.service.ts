import bcrypt from "bcryptjs";
import { createId, users } from "../../database.js";
import { CreateUserDto, UpdateUserDto, User, UserDto } from "../../types.js";

const now = () => new Date().toISOString();

export function toUserDto(user: User): UserDto {
  const { password: _password, ...dto } = user;
  return dto;
}

export function getAllUsers(): UserDto[] {
  return [...users.values()].map(toUserDto);
}

export function findUserById(id: string): User | null {
  return users.get(id) ?? null;
}

export function findUserByEmail(email: string): User | null {
  return [...users.values()].find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function createUser(dto: CreateUserDto): UserDto {
  const date = now();
  const user: User = {
    id: createId(),
    name: dto.name,
    email: dto.email,
    password: bcrypt.hashSync(dto.password, Number(process.env.SALT_ROUNDS ?? 10)),
    userTypeId: dto.userTypeId,
    createdAt: date,
    updatedAt: date,
  };

  users.set(user.id, user);
  return toUserDto(user);
}

export function updateUser(id: string, dto: UpdateUserDto): UserDto | null {
  const user = users.get(id);
  if (!user) return null;

  const updated: User = {
    ...user,
    ...dto,
    password: dto.password
      ? bcrypt.hashSync(dto.password, Number(process.env.SALT_ROUNDS ?? 10))
      : user.password,
    updatedAt: now(),
  };

  users.set(id, updated);
  return toUserDto(updated);
}

export function deleteUser(id: string): boolean {
  return users.delete(id);
}
