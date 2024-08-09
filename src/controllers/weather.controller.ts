// Package
import axios from "axios";
import type {Request, Response} from 'express'
import { z } from "zod";

// ส่วนนี้ผมใช้เป็นการ Validate ข้อมูลที่จะส่งมาใช้ Package ของ zod
const ZodQuery = z.object({
    query: z.string({ message: "กรุณากรอกข้อมูลใน query เช่น จังหวัด (เป็นภาษาอังกฤษ), ละติจูด ลองติจูด " }),
  });

// getCurrentWeather ฟังก์ชั้นที่ส่งออกไป
export async function getCurrentWeather(req: Request, res: Response) {
    try {
        // ผมได้ดึงข้อมูลจาก request body ออกมาเป็น query แต่ถ้าเขียนอีกแบบจะได้เป็น const query = req.body.query; ซึ่งมันยาวไป
        const { query } = req.body;

        // ส่วนนี้คือ Validate เป็น Parameter ใช้งานเริ่มต้นของ zod ในการตรวจสอบข้อมูลแบบ Object 
        const validatedFields = ZodQuery.safeParse({ query });

        // ส่วนนี้คือเช็คว่า validatedFields.success เป็น true ไหมถ้าเป็น false ให้ทำ if condition นี้
        // เพิ่มเติม สังเกตุว่า ผมใส่ ! นำหน้า validatedFields.success เพราะ if condition จะทำงานเมื่อค่าเป็น true ดังนั้น !validatedFields.success จึงให้อารมณ์เหมือน validatedFields.success เป็น false นะแต่ใส่อันนี้ [ ! ] ให้มันเป็น true หรือ เปลี่ยนจาก false เป็น true นั้นแหละ
        // อีกกรณีถ้า validatedFields.success เป็น true แล้วเราใส่ ! นำหน้า (!validatedFields.success) จะเปลี่ยเนป็น false ทันที ดังนั้นนะครับ ไอนี่ [ ! ] เปลี่ยน True เป็น False และ เปลี่ยน False เป็น True
        if (!validatedFields.success) {
            // ส่วนนี้ในเมื่อข้อมูลไม่ถูกแล้ว ผมเลยส่ง code 400 หรือ bad request กลับไปเพื่อแจ้งว่าข้อมูลไม่ครบ หรือ ไม่ถูกต้อง
            return res.status(400).json({
              status: 'bad',
              code: 400,
              // อันนี้เป็นข้อมูล Error ของที่เราได้ validatedFields ใว้
              errors: validatedFields.error.flatten().fieldErrors
            });
        }
        // url ไม่ต้องทำอะไรมาก หากเอาโค้ตไปใช้เองก็ไปขอ key จากลิงก์ที่ผมแนบใว้ใน .env.example เองจ้า
        const url = process.env.WEATHER_URL + `/current.json?key=${process.env.WEATHER_KEY}&q=${validatedFields.data.query}`;
        
        // ส่วนนี้เป็นการเรียก API โดยผมใช้ axios เพราะผมชอบครับขอบคุณครับ 555 และได้ใช้ async/await ในการ Promise ซึ่งส่วนนี้ผมก็ไม่มั่นใจว่ามันทำอะไร แต่ผมใช้เป็น555
        const response = await axios.get(url);
        
        // ผมได้เปลี่ยนจากการเรียกข้อมูลยาวๆ เป็นแค่นี้ ตามชื่อตัวแปร
        const current = response.data.current;

        // ส่วนนี้เป็นข้อมูลที่ผมส่งออก response ไป
        const json = {
            status: 'ok',
            code: 200,
            // ส่วนนี้เป็นข้อมูลจาก Weather API แต่ผมเอามาดันแปลงเปลี่ยนชื่อ เปลี่ยนนิดๆหน่อยๆ เพื่อจะให้ง่ายต่อการเรียนรู้
            data: {
                location: response.data.location,
                current: {
                    last_updated: current.last_updated,
                    temp: {
                        text: "อุณหภูมิ (โดยเฉลี่ย)",
                        celsius: current.temp_c,
                        fahrenheit: current.temp_f
                    },
                    condition: current.condition,
                    wind: {
                        text: "แรงลม",
                        mph: current.wind_mph,
                        kph: current.wind_kph,
                        degree: current.wind_degree,
                        dir: current.wind_dir,
                    },
                    pressure: {
                        text: "ความกดอากาศต่อ",
                        millibars: current.pressure_mb,
                        inches: current.pressure_mb
                    },
                    wind_chill: {
                        text: "อุณหภูมิลมหนาว",
                        celsius: current.windchill_c,
                        fahrenheit: current.windchill_f
                    },
                    humidity: {
                        text: "ความชื้นในอากาศ หน่วยเปอร์เซ็นต์",
                        percentage: current.humidity
                    },
                    cloud_cover: {
                        text: "เมฆปกคลุม หน่วยเปอร์เซ็นต์",
                        percentage: current.cloud
                    },
                    precipitation: {
                        text: "ปริมาณน้ำฝน",
                        millimeters: current.precip_mm,
                        inches: current.precip_in
                    },
                    is_day: {
                        text: "กลางวันหรือกลางคืน",
                        data: current.is_day == 1 ? "กลางวัน" : "กลางคืน",
                        default: current.is_day
                    },
                    uv: {
                        text: "ค่าดัชนี UV",
                        data: current.uv
                    },
                    feels_like: {
                        text: "อุณหภูมิใกล้เคียงความจริง ที่ผิวหนังจะรู้สึกได้",
                        celsius: current.feelslike_c,
                        fahrenheit: current.feelslike_f,
                    },
                    heat_index: {
                        text: "ดัชนีความร้อน",
                        celsius: current.heatindex_c,
                        fahrenheit: current.heatindex_f,
                    },
                    dew_point: {
                        text: "อุณหภูมิจุดน้ำค้าง",
                        celsius: current.dewpoint_c,
                        fahrenheit: current.dewpoint_f,
                    },
                    visibility: {
                        text: "ทัศนวิสัย",
                        kilometer: current.vis_km,
                        miles: current.vis_miles,
                    } 
                }
            }
        };

        // ส่วนนี้ผมส่งทั้งข้อมูล json และ status ออกไปทุกๆคนสามารถเลือกใช้ในการตรวจสอบได้ว่าจะใช้ status หรือ data.code
        return res.status(200).json(json);
    } catch (error: any) {
        // ส่วนนี้ผมใช้ error: any เพราะผมขี้เกียจใช้ if error instanceof Error
        const json = {
            status: 'ok',
            code: 400,
            error: error.message
        }
        // ส่วนนี้ผมส่งทั้งข้อมูล json และ status ออกไปทุกๆคนสามารถเลือกใช้ในการตรวจสอบได้ว่าจะใช้ status หรือ data.code
        return res.status(400).json(json);
    }
}