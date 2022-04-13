import config from "config";
import { object, string, TypeOf } from "zod";

const minPasswordLength = config.get<number>("minPasswordLength");

/**
 * The .refine() function is used to provide custom validation logic
 */
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({  // Provided password from user.
      required_error: "Password is required",
    }).min(minPasswordLength, `Password too short - ${minPasswordLength} character minimum`),
    passwordConfirmation: string({  // Provided password from user (again).
      required_error: "passwordConfirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }).refine(data => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

// Generating a new type with the help of zod. We use this in user.controller.
export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation" // Need to explicitly omit this one. Dot notation works.
>;
