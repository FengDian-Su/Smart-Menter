import sqlite3

conn = sqlite3.connect('mydatabase.db')
cursor = conn.cursor()

# 建立資料表
cursor.execute('''CREATE TABLE IF NOT EXISTS sensor_data
                  (id INTEGER PRIMARY KEY AUTOINCREMENT, device char(50), current REAL,work Real,tim1 date)''')
#清空資料表
cursor.execute('''DELETE FROM sensor_data''')
conn.commit()

# 確認資料已清空
cursor.execute('''SELECT * FROM sensor_data''')
rows = cursor.fetchall()
print("清空後的資料表中有", len(rows), "行資料")
conn.commit()