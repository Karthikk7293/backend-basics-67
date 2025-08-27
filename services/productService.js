import { asyncHandler } from "../middlewares/asyncHandler.js"
import { DatabaseError, NotFoundError } from "../middlewares/errorMiddleware.js"
import { Products } from "../models/productModel.js"

export const fetchAllProductsService = async (query) => {
    try {
        const { page, limit = 5, subcategory, priceHigh, priceLow } = query

        console.log({ page, limit, subcategory });

        const filter = {}

        if (subcategory) {
            filter.subcategory = subcategory
        }
        if (priceHigh && priceLow) {
            filter.price = { $lte: priceHigh, $gte: priceLow }
        }
        console.log(filter);

        // find multile doc with price range
        const allProducts = await Products.find(filter).limit(limit)

        return { success: true, length: allProducts.length, allProducts }

    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const updateProductService = async (id) => {
    try {

        // get products with object id (_id)
        const product = await Products.findById(id)
        if (!product) {
            return { success: false, error: "Product not found!" }
        }
        // update the product details like js 
        product.name = 'karthik'

        // save/update the product details to db
        await product.save()

        return { success: true, product }

    } catch (error) {
        return { success: false, error: error.message }
    }
}
export const getProductByIdService = async (productId) => {
    try {
        const product = await Products.findById(productId)

        if (!product) {
            throw new NotFoundError("Product not found!")
        }

        return { success: true, product }
    } catch (error) {
        throw new DatabaseError(error.message)
    }

}


export const deleteProductService = async (id) => {
    try {

        // get the product details with obejct id (_id)
        const product = await Products.findById(id)
        if (!product) {
            return { success: false, error: "Product not found!" }
        }

        // find the product with obejct id and delete with single query
        await Products.findByIdAndDelete(id)

        return { success: true, product }

    } catch (error) {
        return { success: false, error: error.message }
    }
}