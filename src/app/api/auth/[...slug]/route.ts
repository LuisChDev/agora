import { handlers } from "@auth/core";
import { authConfig } from "@/lib/auth";

export const { GET, POST } = handlers(authConfig);