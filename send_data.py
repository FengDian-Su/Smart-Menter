import serial
import serial.tools
import serial.tools.list_ports  # 引用pySerial模組
import requests
import json

def send_update_data(current):
    # Generate random data
    device = "插座1"
    vol = 125
    # current = random.uniform(0, 15)  # Random current value between 0 and 10
    work =  current*vol# Random work status
    data = {'device': device, 'current': current, 'work': work}

    # Send POST request to localhost
    url = 'http://localhost:5000/update_data'
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        print("Data sent successfully.")
    else:
        print("Failed to send data.")


COM_PORT = 'ACOM0'    # 指定通訊埠名稱
BAUD_RATES = 9600    # 設定傳輸速率
print1 = list(serial.tools.list_ports.comports())
for i in print1:
    print(i)
ser = serial.Serial("COM6", BAUD_RATES)   # 初始化序列通訊埠

try:
    while True:
        while ser.in_waiting:          # 若收到序列資料…
            data_raw = ser.read(4)  # 讀取一行
            data = data_raw.decode()   # 用預設的UTF-8解碼
            print('接收到的原始資料：', data_raw)
            print('接收到的資料：', data)
            send_update_data(int(data)/100)


except KeyboardInterrupt:
    ser.close()    # 清除序列通訊物件
    print('再見！')