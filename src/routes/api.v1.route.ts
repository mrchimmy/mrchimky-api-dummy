import { Router } from 'express';
import apicache from 'apicache'
// Controller
import { getProducts } from '../controllers/product.controller';
import { getCurrentWeather } from '../controllers/weather.controller';
import { getUsers } from '../controllers/user.controller';
import { getQrCode } from '../controllers/qrcode.controller';

// Middleware
import { verifyRequest } from '../middlewares/verify.middleware';
import { checkToken } from '../middlewares/checkToken.middleware';

// Utility
import { cacheVersion } from '../utils/caching';

const cache = apicache.middleware;

const router = Router(); 
router.get('/', (req, res) => {
    return res.json({
        status: "ok",
        code: 200,
        message: "สวัสดีนี่คือ API Dummy สำหรับคนอยากลองเล่น API สามารถทำไปใช้ได้เลยยย คำเตือนไม่เหมาะกับการนำไปใช้จริง เหมาะสำหรับการลองใช้ หรือ testing เท่านั้น!! เตือนแล้วนะ",
        author: 'MrChimKy, MrChimKy Developments',
        contacts: {
            facebook: 'https://facebook.com/mrchimky',
            youtube: 'https://youtube.com/@mrchimky',
            youtube_game: 'https://youtube.com/@mrchxmer',
            github: 'https://github.com/mrchimmy'
        }
    });
})
router.get('/test', (req, res) => {
    console.log(apicache.getIndex());
    console.log(apicache.getPerformance());
})
router.get('/product/get', checkToken, verifyRequest, cacheVersion('1 minutes') , getProducts);
router.get('/user/get', checkToken, verifyRequest, cacheVersion('1 minutes') , getUsers);
router.get('/weather/current', checkToken, cache('5 minutes'), getCurrentWeather);

router.get('/qrcode/get', checkToken, getQrCode);

export default router;