
# Dummy API

Author : By MrChimKy | MrChimKy Developments

Dummy API v1 สร้างมาสำหรับโปรแกรมเมอร์เริ่มต้นที่กำลังศึกษาการใช้ API นอกจากใช้ API ของผู้พัฒนาต่างชาติแล้ว ลองมาใช้ของเราสิๆๆๆ Dummy API ออกแบบมาให้ใช้ง่ายเหมาะกับการศึกษาทั้งการ Call API หรืออยากรู้ขั้นตอนทำงานของโค้ต ก็กดดูได้เลยให้แบบไม่กั๊ก

**คำเตือนไม่แนะนำให้นำข้อมูลจาก API ผมเปิดเผยสู่สาธารณะ ใช้ในกรณีศึกษาเท่านั้น !** 

- [Usage/Example](#Usage/Examples)
- [API Reference](#API-Reference)
- [Authors](#Authors)


## Usage/Examples 

```javascript
import axios from 'axios'

const callAPI = async () => {
    const options = {
        headers: {
            "Authorization": "Your Token",
            "Content-Type": "application/json"
        }
    }
    const response = await axios.get("https://dummy.mrchimky.net/api/v1", options);
    
    if (response.data.status != "ok") {
        return false;
    }
    return response.data
}
```
ตัวอย่างการใข้งานข้อมูลจาก QRCode data
```javascript
const data = response.data.data; // ข้อมูลจาก QRCode API

// กรณี 1 Javascript
document.getElementById("qrcode").src = data;
// กรณี 2 JQuery
$('#qrcode').src = data;
// กรณี 3 ReactJS
<img src={data} alt="QRCode" />

```
ตัวอย่างข้อมูล สภาพอากาศ
```javascript
import axios from 'axios'

const callAPI = async () => {
    const options = {
        headers: {
            "Authorization": "Your Token",
            "Content-Type": "application/json"
        },
        data: {
            query: "Nakhon Ratchasima"
        }
    }
    const response = await axios.get("https://dummy.mrchimky.net/api/v1/weather/current", options);
    
    if (response.data.status != "ok") {
        return false;
    }
    return response.data
}
```
บอกแค่นี้แหละ ผมรู้คุณทำได้ลองทำดูเลย!

## API Reference

#### Headers
Token ใช้สำหรับยืนยันเบื้องต้น รูปแบบเป็น UUID v4 สามารถสร้างได้ที่ https://www.uuidgenerator.net/

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string uuidv4` | **Required**. API Token ของคุณ |


#### Get Product Data Dummy

```http
  GET /api/v1/product/get
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `quantity` | `number` | จำนวนข้อมูลที่จะสร้างออกมา ค่าเริ่มต้น 10 |
| `version` | `string` | **Required**. ใช้สำหรับการแคสข้อมูล ตั้งอะไรก็ได้ |

#### Get User Data Dummy

```http
  GET /api/v1/user/get
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `quantity` | `number` | จำนวนข้อมูลที่จะสร้างออกมา ค่าเริ่มต้น 10 |
| `version` | `string` | **Required**. ใช้สำหรับการแคสข้อมูล ตั้งอะไรก็ได้ |

#### Get Weather Now

```http
  GET /api/v1/weather/current
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`      | `string` | **Required**. ใส่ข้อมูล เช่น จังหวัด (EN), ละติจูด ลองติจูด อย่างใดอย่างนึง |

เว็บสำหรับดูชื่อจังหวัดเป็น EN https://en.wikipedia.org/wiki/Provinces_of_Thailand หัวข้อ Capital

#### QRCode Generator

```http
  GET /api/v1/qrcode/get
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `version` | `string` | **Required**. ใช้สำหรับการแคสข้อมูล ตั้งอะไรก็ได้ |
| `text`      | `string` | **Required**. ใส่ข้อมูลที่ต้องการเช่น ข้อความ หรือ ลิงก์ URL |
| `margin`      | `number` | ใส่ตัวเลขสำหรับความหนาของขอบภาพ |
| `color`      | `object` | ใส่สีของ QRCode ได้ !!! |

```javascript
{
    color: {
        primary: "#000000", // สีของจุด QR
        secondary: "#ffffff" // สีพื้นหลัง
    }
}
```

#### Cache Data

- ข้อมูลสินค้า 5 นาที ยกเลิกได้
- ข้อมูลบุคคล 5 นาที ยกเลิกได้
- ข้อมูลสภาพอากาศ 5 นาที ยกเลิกไม่ได้
- ข้อมูล QRCode 5 นาที ยกเลิกได้

วิธีการยกเลิก Cache สามารถเปลี่ยน Parameter **version** จากค่าเดิมเป็นค่าใหม่อะไรก็ได้ จากนั้นระบบจะทำการยกเลิก Cache เก่าและส่งข้อมูลใหม่

อนาคตผมอาจจะเพิ่มเวลา Cache ถ้า Hosting ผมมัน Usage เต็ม 555 ถนอน Hosting ผมด้วยนะฮะ


## Authors

- [@mrchimmy](https://www.github.com/mrchimmy)
- [@mrchimmy facebook](https://www.facebook.com/mrchimky)

