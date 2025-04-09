import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_ID: string;
      GITHUB_SECRET: string;

      GOOGLE_ID: string;
      GOOGLE_SECRET: string;

      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_BUCKET_NAME: string;
      AWS_REGION: string;
    }
  }

  var prisma: PrismaClient;
}
