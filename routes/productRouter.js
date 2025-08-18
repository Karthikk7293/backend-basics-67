import { Router } from "express";
import { getAllProducts, getProductById } from "../controllers/productController.js";

const router = Router();


router.route('/').get(getAllProducts);
router.route('/product-details/:productId').get(getProductById);



export default router