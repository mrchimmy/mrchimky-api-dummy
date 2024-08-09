
# Dummy API

Author : By MrChimKy | MrChimKy Developments

Dummy API v1 สร้างมาสำหรับโปรแกรมเมอร์เริ่มต้นที่กำลังศึกษาการใช้ API นอกจากใช้ API ของผู้พัฒนาต่างชาติแล้ว ลองมาใช้ของเราสิๆๆๆ Dummy API ออกแบบมาให้ใช้ง่ายเหมาะกับการศึกษาทั้งการ Call API หรืออยากรู้ขั้นตอนทำงานของโค้ต ก็กดดูได้เลยให้แบบไม่กั๊ก

- [Usage/Example](#Usage/Examples)
- [API Reference](#API-Reference)
- [Usage/Example](#Authors)


## Usage/Examples 

```javascript
import axios from 'axios'

const call = async () => {
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

#### Get Weather Now

```http
  GET /api/v1/qrcode/get
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
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

#### add(num1, num2)

Takes two numbers and returns the sum.


## Authors

- [@mrchimmy](https://www.github.com/mrchimmy)
- [@mrchimmy facebook](https://www.facebook.com/mrchimky)

