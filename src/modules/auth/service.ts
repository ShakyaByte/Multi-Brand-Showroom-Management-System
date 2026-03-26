import { AppError } from "@/utils/appError";
import { hashPassword, matchPassword, jwtSign, jwtVerify } from "@/utils/helper";
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from "@/modules/auth/validator";
import UserModel from "@/modules/users/model";
import { db } from "@/db";
import rolesSchema from "@/modules/roles/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/utils/email";

// Helper to get role name by id
async function getRoleName(roleId: number): Promise<string> {
  const [role] = await db
    .select({ name: rolesSchema.name })
    .from(rolesSchema)
    .where(eq(rolesSchema.id, roleId));
  return role?.name || "UNKNOWN";
}

// Generate OTP helper
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

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

    const roleName = await getRoleName(user.roleId);

    const token = jwtSign({
      id: user.id,
      email: user.email,
      role: roleName,
      brandId: user.brandId,
      showroomId: user.showroomId,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: roleName,
        roleId: user.roleId,
        brandId: user.brandId,
        showroomId: user.showroomId,
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

    const roleName = await getRoleName(user.roleId);

    const token = jwtSign({
      id: user.id,
      email: user.email,
      role: roleName,
      brandId: user.brandId,
      showroomId: user.showroomId,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: roleName,
        roleId: user.roleId,
        brandId: user.brandId,
        showroomId: user.showroomId,
      },
      token,
    };
  },

 forgotPassword: async (input: any) => {
  const { value, error } = forgotPasswordSchema.validate(input);
  if (error) throw error;

  const user = await UserModel.findByEmail(value.email);
  if (!user) {
    return { message: "If that email is registered, an OTP has been sent." };
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  // Save OTP and expiry to user record
  await UserModel.update(user.id, {
    otp,
    otpExpiry,
  });

  await sendEmail({
    to: user.email,
    subject: "Password Reset OTP",
    html: `
      <p>You requested a password reset.</p>
      <p>Your OTP is: <strong>${otp}</strong></p>
      <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>
    `,
  });

  return {
    message: "If that email is registered, an OTP has been sent.",
  };
},

resetPassword: async (input: any) => {
  const { value, error } = resetPasswordSchema.validate(input);
  if (error) throw error;

  const { email, otp, newPassword } = value;

  const user = await UserModel.findByEmail(email);
  if (!user) {
    throw new AppError("Invalid OTP or email", 400);
  }

  // Check OTP matches and not expired
  if (user.otp !== otp) {
    throw new AppError("Invalid OTP", 400);
  }

  if (!user.otpExpiry || new Date() > new Date(user.otpExpiry)) {
    throw new AppError("OTP has expired", 400);
  }

  const hashedPassword = await hashPassword(newPassword);

  // Clear OTP after successful reset
  await UserModel.update(user.id, {
    password: hashedPassword,
    otp: null,
    otpExpiry: null,
  });

  return { message: "Password reset successfully. You can now login." };
},
};
