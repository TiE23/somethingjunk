import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";

import UserModel, { UserDocument, UserInput } from "../models/user.model";

/**
 * Creates the user in the database and returns what was created sans the password.
 * @param input UserInput interface
 * @returns
 */
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


/**
 * When logging in with a user we find the user in the database by their email
 * and then check if the password that was provided matches the one in our server
 * after we compare it with bcrypt.compare().
 * @param param0
 * @returns
 */
export async function validatePassword({
  email,
  password,
}: {
  email: string,
  password: string
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}


/**
 * A quick and easy way to find a single user.
 * @param query Simply provide an object with the desired criteria.
 * For example: { _id: "abcd1234" }.
 * @returns
 */
export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
