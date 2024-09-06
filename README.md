# Smart Menter For Household Appliances
響應聯合國永續發展目標之 SDG-7 (Affordable and Clean Energy)，對智慧電網技術進行研究與創新，實作一套智能家庭用電管理系統。

## Method
- 智慧物聯網：偵測電流情況並傳輸至本地伺服器
- 資料庫：存儲用電資料，提供分析和顯示
- 大型語言模型：從定量資料中分析用電量情況並給出建議
- 全端網頁：提供用戶可操作介面

## System Structure
<img src = "https://github.com/FengDian-Su/Smart-Menter/blob/main/Image/Structure.png" width = "450px">

## File
| File Name                                  | Description                                                   |
| ------------------------------------------ | --------------------------------------------------------------|
| app.py                                     | 執行 Flask 後端程式                                            |
| send_data.py                               | 接收來自 Arduino 傳輸的資料                                    |
| initdb.py                                  | 初始化 mydatabase 資料庫                                       |
| mydatabase.db                              | 儲存即時用電資料                                               |
| fake.py                                    | 使用 fake.db 資料庫模擬運行情況                                 |
| fake.db                                    | 隨機生成資料用於模擬和測試                                      |
| breeze.py                                  | 使用 Breeze LLM 分析用電數據                                   |
| llm_get_data.json                          | 將定量資料交由 LLM 分析                                        |
| static/index.html                          | 用戶前端網頁介面                                               |
| static/style.css                           | 網頁排版                                                      |
| static/script.js                           | 響應事件及連接前後端資料傳輸                                    |

## Demo
- **模擬成果展示**<br><br>
  <img src = "https://github.com/FengDian-Su/Smart-Menter/blob/main/Image/Demo1.png" width = "450px"><br>

- **前端網頁展示**<br><br>
  <img src = "https://github.com/FengDian-Su/Smart-Menter/blob/main/Image/Demo2.png" width = "450px"><br>

## Contributer
- [baiyanchen8](https://github.com/baiyanchen8)
- [FengDian-Su](https://github.com/FengDian-Su)
- [ChingChingKao](https://github.com/ChingChingKao)
- [Chia-Shen Hsu](https://github.com/Willy92629)

