import { object, string, number, TypeOf } from "zod";

/**
 * Note that this is a plain object.
 */
const payload = {
  body: object({
    title: string({
      required_error: "Title is requried",
    }),
    description: string({
      required_error: "Description is required",
    }).min(120, "Description should be at least 120 characters long"),
    price: number({
      required_error: "Price is required",
    }),
    image: string({
      required_error: "Image is required",
    }),
  }),
};

/**
 * Note that this is a plain object.
 */
const params = {
  params: object({
    productId: string({
      required_error: "productId is required",
    }),
  }),
};

/**
 * Requires a payload body to create the new product.
 */
export const createProductSchema = object({
  ...payload,
});

/**
 * Requires a payload body of new data and params to find the product to update.
 */
export const updateProductSchema = object({
  ...payload,
  ...params,
});

/**
 * Requires params to find the product.
 */
export const getProductSchema = object({
  ...params,
});

/**
 * Requires params to find the product and the calling user must be the author
 * to be able to delete.
 */
export const deleteProductSchema = object({
  ...params,
});

// Name the input "Read" instead of "Get" just to follow CRUD naming I guess.
export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
