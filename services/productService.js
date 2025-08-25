import { Products } from "../models/productModel.js"

export const fetchAllProductsService = async () => {
    try {
        // find multile doc with price range
        const allProducts = await Products.find({ price: { $lte: 1000, $gte: 500 }, brand: 'Samsung' })

        return { success: true, allProducts }

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