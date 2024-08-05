import { getProducts } from '../controllers/product.controller';
import { Router } from 'express';
import { CacheMiddleware } from '../middlewares/product.middleware';
import { getUsers } from '../controllers/user.controller';
import { getCurrentWeather } from '../controllers/weather.controller';

// Cache
import apicache from 'apicache'
import { getQrCode } from '../controllers/qrcode.controller';
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
router.get('/product/get', CacheMiddleware , getProducts);
router.get('/user/get', CacheMiddleware , getUsers);
router.get('/weather/current', cache('5 minutes'), getCurrentWeather);

router.get('/qrcode/get', getQrCode);

export default router;