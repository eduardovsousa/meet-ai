import { z } from "zod";

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is requred" }),
  instructions: z.string().min(1, { message: "Instructions are requred" }),
})