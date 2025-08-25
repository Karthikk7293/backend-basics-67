import { Router } from "express";
import { deleteProductById, getAllProducts, getProductById, updateProductById } from "../controllers/productController.js";

const router = Router();


router.route('/').get(getAllProducts);
router.route('/product-details/:productId').get(getProductById);
router.route('/update/:productId').patch(updateProductById);
router.route('/delete/:productId').delete(deleteProductById);



export default router