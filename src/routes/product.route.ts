import { index } from '../controllers/product.controller'
import { Router } from 'express'
const router = Router(); 

router.get('/get', index);

export default router