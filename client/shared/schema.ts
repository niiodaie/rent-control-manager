// client/shared/schema.ts

import { z } from "zod";

export const insertApplicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
});
