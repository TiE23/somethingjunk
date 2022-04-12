import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";

import UserModel, { UserInput } from "../models/user.model";

export async function createUser(
  // Only the relevant bits of data here.
  input: DocumentDefinition<UserInput>,
) {
  try {
    const user = await UserModel.create(input);

    // Take the "password" property from the returned value.
    return omit(user.toJSON(), "password");
  } catch (error: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
    throw new Error(error);
  }
}
