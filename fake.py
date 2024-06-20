import requests
import json
import random
import time

def send_update_data(current=random.uniform(0,1500)):
    # Generate random data
    device =random.choice (["插座1","插座2","插座3"])
    vol=115
    current=current/100
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

if __name__ == "__main__":
    while True:
        send_update_data()
        time.sleep(5)  # Send data every 5 seconds
