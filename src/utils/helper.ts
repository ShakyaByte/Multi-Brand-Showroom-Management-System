import type { Response } from "express";
import type { IResponse } from "../interface";
import jwt, { type SignOptions } from "jsonwebtoken";
import env from "../config/env";
import bcrypt, { genSalt } from "bcrypt";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  payload: IResponse<T>
) => {
  return res.status(statusCode).json(payload);
};

export const getPagination = (query: any) => {
  const page = Math.max(+(query.page || 1), 1);
  const limit = Math.max(+(query.limit || 10), 1);
  const offset = (page - 1) * limit;
  return { ...query, page, limit, offset };
};

export function paginate(totalItems: number, page: number, limit: number) {
  const totalPage = Math.ceil(totalItems / limit);
  return {
    totalItems,
    totalPage,
    currentPage: page,
  };
}

export const jwtSign = (data: any, expiresIn: string | number = "30d") =>
  jwt.sign(data, env.JWT_SECRET!, { expiresIn } as SignOptions);
export const jwtVerify = (token: string) => jwt.verify(token, env.JWT_SECRET!);

export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  return await bcrypt.hash(password, salt);
};
export const matchPassword = async (password: string, storedPassword: string) =>
  await bcrypt.compare(password, storedPassword);

export const generateRandomPassword = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
};

export const formatDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
};

export const toDate = (value?: any): Date | undefined => {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return undefined;
  return date;
};
