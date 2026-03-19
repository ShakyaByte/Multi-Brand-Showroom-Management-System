import env from "./src/config/env";

type PgConfig = {
  schema: string;
  out: string;
  dialect: "postgresql";
  dbCredentials: {
    url: string;
  };
};

const config: PgConfig = {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
};

export default config;
