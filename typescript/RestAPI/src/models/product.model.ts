import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export interface ProductInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
}

// Note: Mongoose recommends that you do not extend mongoose.Document
export interface ProductDocument extends ProductInput, mongoose.Document {
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true, default: () => `product_${nanoid()}` },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
}, {
  timestamps: true,
});

// Model definition
const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
