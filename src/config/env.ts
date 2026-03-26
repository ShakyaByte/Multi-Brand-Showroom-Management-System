import dotenv from "dotenv";

dotenv.config();

const env: any = {
  APP_NAME: process.env.APP_NAME || "showroom-management",
  MODE: process.env.MODE || "development",
  PORT: process.env.PORT || "5000",
  JWT_SECRET: process.env.JWT_SECRET,
  API_KEY: process.env.API_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  TIMEZONE: "Asia/Kathmandu",
  SMTP_HOST: process.env.SMTP_HOST ,
  SMTP_PORT: process.env.SMTP_PORT ,
  SMTP_USER: process.env.SMTP_USER ,
  SMTP_PASS: process.env.SMTP_PASS ,
  SMTP_FROM: process.env.SMTP_FROM ,
};

export default env;
