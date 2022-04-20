import { z } from "zod";

export const createToUpperSchema = z.object({
  body: z.object({
    input: z.string({
      required_error: "You must provide an input",
    }),
  }),
});

export type ToUpperInput = z.TypeOf<typeof createToUpperSchema>;
