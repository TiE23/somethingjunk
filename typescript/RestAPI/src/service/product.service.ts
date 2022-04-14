import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument, ProductInput } from "../models/product.model";

/**
 * Creates a new product and will assign authorship to the user.
 * @param input
 * @returns
 */
export async function createProduct(input: DocumentDefinition<ProductInput>) {
  return ProductModel.create(input);
}


/**
 * Finds product through a filter query.
 * @param query
 * @param options
 * @returns
 */
export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true },
) {
  return ProductModel.findOne(query, {}, options);
}


/**
 * Finds and updates a product.
 * DOES NOT perform any checking to see if the user making the update has the
 * authorization to do so. So be sure to check first with a findProduct() call
 * and check before calling this function!
 * @param query
 * @param update
 * @param options
 * @returns
 */
export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductInput>,
  options: QueryOptions = { lean: true },
) {
  return ProductModel.findOneAndUpdate(
    query,
    update,
    options,
  );
}


/**
 * Removes a product.
 * DOES NOT perform any checking to see if the user performing the delete has the
 * authorization to do so. So be sure to check first with a findProduct() call
 * and check before calling this function!
 * @param query
 * @returns
 */
export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(query);
}
