import axios from "axios";
import type {Request, Response} from 'express'
import { z } from "zod";

const ZodQuery = z.object({
    query: z.string({ message: "กรุณากรอกข้อมูลใน query เช่น จังหวัด (เป็นภาษาอังกฤษ), ละติจูด ลองติจูด " }),
  });

export async function getCurrentWeather(req: Request, res: Response) {
    try {
        const { query } = req.body;
        const validatedFields = ZodQuery.safeParse({ query });
        if (!validatedFields.success) {
            return res.status(400).json({
              status: 'bad',
              code: 400,
              errors: validatedFields.error.flatten().fieldErrors
            });
        }
        const url = process.env.WEATHER_URL + `/current.json?key=${process.env.WEATHER_KEY}&q=${validatedFields.data.query}`;
        const response = await axios.get(url);
        const current = response.data.current;
        const json = {
            status: 'ok',
            code: 200,
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
        return res.status(200).json(json);
    } catch (error: any) {
        const json = {
            status: 'ok',
            code: 400,
            error: error.message
        }
        return res.status(400).json(json);
    }
}