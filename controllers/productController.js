import { productsData } from "../constants/productsData.js";
import { statusCodes } from "../helpers/userHelpers.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { NotFoundError, sendSuccess, ValidationError } from "../middlewares/errorMiddleware.js";
import { deleteProductService, fetchAllProductsService, getProductByIdService, updateProductService } from "../services/productService.js";

export const getAllProducts = asyncHandler(async (req, res) => {

    const products = await fetchAllProductsService(req.query)

    if (!products.success) {
        throw new NotFoundError("No product found!")
    }

    if (!products || products?.allProducts?.length === 0) {
        throw new NotFoundError("No product found!")
    }

    sendSuccess(res, products)
})

export const getProductById = asyncHandler(async (req, res) => {

    const { productId } = req.params;


    if (!productId) {
        throw new ValidationError("product id not found!")
    }

    const product = await getProductByIdService(productId)

    sendSuccess(res, product)

})


export const updateProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await updateProductService(productId)

        if (!product.success) {
            const status = statusCodes.find((item) => item.code === 404);
            return res.status(status.code).json({ success: false, error: product.error, message: `Product not found: ${status.message}` });
        }
        const status = statusCodes.find((item) => item.code === 200);
        res.status(status.code).json({ success: true, message: "Product fetched successfully!", data: product });


    } catch (error) {
        console.log(error);
        const status = statusCodes.find((item) => item.code === 500);
        res.status(status.code).json({ success: false, message: `getProductById: ${status.message}` });
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await deleteProductService(productId)

        if (!product.success) {
            const status = statusCodes.find((item) => item.code === 404);
            return res.status(status.code).json({ success: false, error: product.error, message: `Product not found: ${status.message}` });
        }
        const status = statusCodes.find((item) => item.code === 200);
        res.status(status.code).json({ success: true, message: "Product deleted successfully!", data: product });


    } catch (error) {
        console.log(error);
        const status = statusCodes.find((item) => item.code === 500);
        res.status(status.code).json({ success: false, message: `getProductById: ${status.message}` });
    }
}