import config from "config";
import z from "zod";

const caseChangeMaxLength = config.get<number>("caseChangeMaxLength");

// Zod Enum (retrieve array of strings with zodeEnumMode.options).
// export const zodEnumMode = z.enum(["upper", "lower"]);
// export type Mode = z.infer<typeof zodEnumMode>

// Zod NativeEnum (An explicit string enum is required).
export enum ModeEnum { Upper = "upper", Lower = "lower" }
const zodModeEnum = z.nativeEnum(ModeEnum, {
  required_error: "Mode is required",
});

const input = z.string({
  required_error: "String value is required",
}).max(caseChangeMaxLength);

export const createCaseChangePostSchema = z.object({
  body: z.object({ input }),
  params: z.object({ mode: zodModeEnum }),
});

export const createCaseChangeGetSchema = z.object({
  params: z.object({ input, mode: zodModeEnum }),
});

export type CaseChangePostInput = z.TypeOf<typeof createCaseChangePostSchema>;
export type CaseChangeGetInput = z.TypeOf<typeof createCaseChangeGetSchema>;
