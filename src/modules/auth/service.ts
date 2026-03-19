import { AppError } from "@/utils/appError";
import { hashPassword, matchPassword, jwtSign } from "@/utils/helper";
import { loginSchema, registerSchema } from "@/modules/auth/validator";
import UserModel from "@/modules/users/model";

export const AuthService = {
  register: async (input: any) => {
    const { value, error } = registerSchema.validate(input, { abortEarly: false });
    if (error) throw error;

    const existing = await UserModel.findByEmail(value.email);
    if (existing) {
      throw new AppError("Email already exists", 400);
    }

    value.password = await hashPassword(value.password);
    const user = await UserModel.create(value);
    if (!user) {
      throw new AppError("Failed to register user", 500);
    }

    const token = jwtSign({
      id: user.id,
      email: user.email,
      role: user.roleId,
      brandId: user.brandId,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        brandId: user.brandId,
      },
      token,
    };
  },

  login: async (input: any) => {
    const { value, error } = loginSchema.validate(input, { abortEarly: false });
    if (error) throw error;

    const user = await UserModel.findByEmail(value.email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isMatch = await matchPassword(value.password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = jwtSign({
      id: user.id,
      email: user.email,
      role: user.roleId,
      brandId: user.brandId,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        brandId: user.brandId,
      },
      token,
    };
  },
};
