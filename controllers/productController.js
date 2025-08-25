import { productsData } from "../constants/productsData.js";
import { statusCodes } from "../helpers/userHelpers.js";
import { deleteProductService, fetchAllProductsService, updateProductService } from "../services/productService.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await fetchAllProductsService()

        if (!products.success) {
            const status = statusCodes.find((item) => item.code === 500);
            return res.status(status.code).json({ success: false, error: products.error, message: `No products found: ${status.message}` });
        }

        if (!products || products.allProducts.length === 0) {
            {
                const status = statusCodes.find((item) => item.code === 404);

                return res.status(status.code).json({ success: false, message: `No products found: ${status.message}` });
            }
        }

        const status = statusCodes.find((item) => item.code === 200);
        res.status(status.code).json({ success: true, message: "Products fetched successfully!", quantity: products.allProducts.length, data: products.allProducts, });

    } catch (error) {
        console.log(error);
        const status = statusCodes.find((item) => item.code === 500);
        res.status(status.code).json({ success: false, message: `getAllProducts: ${status.message}` });

    }
}

export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log(`Fetching product with ID: ${productId}`);
        const product = productsData.find((item) => item.id === parseInt(productId));

        if (!product) {
            const status = statusCodes.find((item) => item.code === 404);
            return res.status(status.code).json({ success: false, message: `Product not found: ${status.message}` });
        }
        const status = statusCodes.find((item) => item.code === 200);
        res.status(status.code).json({ success: true, message: "Product fetched successfully!", data: product });


    } catch (error) {
        console.log(error);
        const status = statusCodes.find((item) => item.code === 500);
        res.status(status.code).json({ success: false, message: `getProductById: ${status.message}` });
    }
}


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