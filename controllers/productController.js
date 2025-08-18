import { productsData } from "../constants/productsData.js";
import { statusCodes } from "../helpers/userHelpers.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = productsData;

        if (!products || products.length === 0) {
            {
                const status = statusCodes.find((item) => item.code === 404);

                return res.status(status.code).json({ success: false, message: `No products found: ${status.message}` });
            }
        }

        const status = statusCodes.find((item) => item.code === 200);
        res.status(status.code).json({ success: true, message: "Products fetched successfully!", data: products });

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