import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

// Note: Mongoose recommends that you do not extend mongoose.Document
export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Schema definition
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
});

// Pre-save hook to our schema
userSchema.pre("save", async function(next) {
  // Renaming this "user" for better clarity.
  const user = this as UserDocument;

  // Check if the password has changed. If not, just go.
  if (!user.isModified("password")) {
    return next();
  }

  // Salt and hash the new password.
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hash(user.password, salt);

  // Set the hashed password.
  user.password = hash;

  return next();
});

/**
 * It's important to define this as a method so we can access `this`. It's a
 * smart shortcut without having to do anything else odd.
 * @param candidatePassword
 * @returns
 */
userSchema.methods.comparePassword = async function(
  candidatePassword: string,
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch(_ => false);
};

// Model definition
const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
