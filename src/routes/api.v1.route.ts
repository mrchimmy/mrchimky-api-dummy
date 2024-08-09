import { getProducts } from '../controllers/product.controller';
import { Router } from 'express';
// import { CacheMiddleware } from '../middlewares/product.middleware';
// import { getUsers } from '../controllers/user.controller';
import { getCurrentWeather } from '../controllers/weather.controller';

import apicache from 'apicache'
import { getQrCode } from '../controllers/qrcode.controller';
import { checkToken } from '../middlewares/checkToken.middleware';
import { cacheVersion } from '../utils/caching';
const cache = apicache.middleware;

const router = Router(); 
router.get('/test', (req, res) => {
    console.log(apicache.getIndex());
    console.log(apicache.getPerformance());
})
router.get('/product/get', checkToken, cacheVersion('1 minutes') , getProducts);
// router.get('/user/get', checkToken, CacheMiddleware , getUsers);
router.get('/weather/current', checkToken, cache('5 minutes'), getCurrentWeather);

router.get('/qrcode/get', checkToken, getQrCode);

export default router;