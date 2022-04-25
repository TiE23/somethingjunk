import z from "zod";
export const shortenerUrlSchema = z.object({
  body: z.object({
    url: z.string({
      required_error: "Need URL",
    }),
  }),
});

export type ShortenerInput = z.TypeOf<typeof shortenerUrlSchema>;
