import { loadEnvFile } from "node:process";

try {
  loadEnvFile();
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : "unknown error";

  console.error(`Failed to load .env file: ${errorMessage}`);
}

export const { NODE_ENV } = process.env;
