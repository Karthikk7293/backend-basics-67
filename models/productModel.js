import { model, Schema } from "mongoose";

const productSchema = Schema({
    name: { type: String, },
    productSchema: { type: String, },
    subcategory: { type: String, },
    brand: { type: String, },
    supplier: { type: String, },
    price: Number,
    costPrice: Number,
}, { timestamp: true })

productSchema.index({ brand: 1, pirce: -1 })
productSchema.index({ name: 'text' })

export const Products = model('products', productSchema)