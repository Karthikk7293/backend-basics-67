import { Products } from "../models/productModel.js"

// basic aggregation of products 
export const avgProductsList = async () => {
    try {
        const products = await Products.aggregate([
            // set 1
            {
                $match: { price: { $lte: 100, $gte: 60 } },

            },
            //set 2
            { $limit: 3 },
            // set 3 
            {
                $sort: { createdDate: -1 }
            },
            {
                $project: {
                    name: 1,
                    price: 1,
                    brand: 1
                }
            }

        ])

        console.log({ products });

        return products


    } catch (error) {
        console.log(error);

    }
}

// avg products list 

export const productList = async () => {
    try {
        const product = await Products.aggregate([
            {
                $group: {
                    _id: "$category",
                    avaragePrice: { $avg: "$price" },
                    totalStock: { $sum: "$stockQuantity" },
                    productCount: { $sum: 1 }
                }
            }
        ])
        return product

    } catch (error) {
        console.log(error);
    }
}

export const productProfit = async () => {
    try {
        const product = await Products.aggregate([
            {
                $project: {
                    name: 1,
                    brand: 1,
                    price: 1,
                    costPrice: 1,
                    profit: { $add: ['$price', '$costPrice'] }
                }
            }
        ])
        return product

    } catch (error) {
        console.log(error);
    }
}