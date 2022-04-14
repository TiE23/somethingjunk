import { Request, Response } from "express";

import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from "../service/product.service";
import { CreateProductInput, DeleteProductInput, ReadProductInput, UpdateProductInput } from "../schema/product.schema";
import logger from "../utils/logger";

/**
 * Takes the body and creates a new product, assigning the user as the author.
 * @param req
 * @param res
 * @returns
 */
export async function createProductHandler(
  req: Request<Record<string, unknown>, Record<string, unknown>, CreateProductInput["body"]>,
  res: Response,
) {
  try {
    const userId = res.locals.user._id;
    const { body } = req;

    const product = await createProduct({ ...body, user: userId });
    return res.send(product);

  } catch (error: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
    logger.error(error);
    return res.status(409).send(error.message); // 409 = "Conflict"
  }
}


/**
 * Updates a product. Requires both parameters and a body to update correctly.
 * @param req
 * @param res
 * @returns
 */
export async function updateProductHandler(
  req: Request<UpdateProductInput["params"], Record<string, unknown>, UpdateProductInput["body"]>,
  res: Response,
) {
  try {
    const userId = res.locals.user._id;
    const { productId } = req.params;
    const { body: update } = req;

    const product = await findProduct({ productId });

    if (!product) {
      return res.sendStatus(404); // Not found
    }

    if (String(product.user) !== userId) {
      return res.sendStatus(403); // Forbidden (trying to update a product you didn't create).
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update);

    return res.send(updatedProduct);

  } catch (error: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
    logger.error(error);
    return res.status(400).send(error.message);
  }
}


/**
 * Gets a product through parameters. Any user can use this.
 * @param req
 * @param res
 * @returns
 */
export async function getProductHandler(
  req: Request<ReadProductInput["params"]>,
  res: Response,
) {
  try {
    const { productId } = req.params;

    const product = await findProduct({ productId });

    if (!product) {
      return res.sendStatus(404); // Not found
    }

    return res.send(product);

  } catch (error: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
    logger.error(error);
    return res.status(400).send(error.message);
  }
}


/**
 * Deletes a product using params. Only the original author can do this.
 * @param req
 * @param res
 * @returns
 */
export async function deleteProductHandler(
  req: Request<DeleteProductInput["params"]>,
  res: Response,
) {
  try {
    const userId = res.locals.user._id;
    const { productId } = req.params;

    const product = await findProduct({ productId });

    if (!product) {
      return res.sendStatus(404); // Not found
    }

    if (String(product.user) !== userId) {
      return res.sendStatus(403); // Forbidden (trying to delete a product you didn't create).
    }

    await deleteProduct({ productId });
    return res.sendStatus(200);

  } catch (error: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
    logger.error(error);
    return res.status(400).send(error.message);
  }
}
