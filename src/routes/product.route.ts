import { index } from '../controllers/product.controller';
import { Router } from 'express';
import { productCacheMiddleware } from '../middlewares/product.middleware';

const router = Router(); 

router.get('/get', productCacheMiddleware ,index);

export default router;