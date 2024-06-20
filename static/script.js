document.addEventListener('DOMContentLoaded', function () {
    const initialRankingData = [
        { plugin: '插座1', totalPower: 5 },
        { plugin: '插座2', totalPower: 3 },
        { plugin: '插座3', totalPower: 2 }
    ];

    // 用電量排名圖表
    window.rankingChart = Highcharts.chart('plug', {
        chart: {
            type: 'bar',
            width: 400,
            height: 250,
            style: {
                borderRadius: '10px'
            },
            margin: [60, 50, 70, 80]
        },
        credits: {
            enabled: false
        },
        title: {
            text: '用電量排名',
            style: {
                fontSize: '18px'
            },
            x: -100,
            y: 25
        },
        xAxis: {
            categories: initialRankingData.map(item => item.plugin)
        },
        yAxis: {
            title: {
                text: '度電'
            }
        },
        series: [{
            name: '用電量',
            data: initialRankingData.map(item => item.totalPower),
            pointWidth: 10,
            showInLegend: false
        }]
    });
});

// 定義 updateChart 函數
function updateChart(data) {
    console.log("Data for updateChart:", data); // 檢查傳入 updateChart 的資料格式

    if (!Array.isArray(data)) {
        console.error('Data is not an array:', data);
        return;
    }

    const categories = data.map(entry => entry.month);
    const powerData = data.map(entry => entry.power);

    chart.update({
        xAxis: {
            categories: categories
        },
        series: [{
            name: '用電量',
            data: powerData
        }]
    });
}

function updateRankingChart(data) {
    // 提取插座名稱和總用電量
    const categories = data.map(item => item.plugin);
    const powerData = data.map(item => item.totalPower);

    // 更新圖表
    rankingChart.update({
        xAxis: {
            categories: categories
        },
        series: [{
            name: '用電量',
            data: powerData
        }]
    });
}

// 初始化 Highcharts 圖表
document.addEventListener('DOMContentLoaded', function () {
    const initialData = [];

    const chart = Highcharts.chart('trend', {
        chart: {
            type: 'column',
            width: 400,
            height: 250,
            style: {
                borderRadius: '10px'
            },
            margin: [70, 20, 30, 70]
        },
        credits: {
            enabled: false
        },
        title: {
            text: '用電量趨勢',
            style: {
                fontSize: '18px'
            },
            x: -100,
            y: 25
        },
        xAxis: {
            categories: initialData.map(entry => entry.time),
            title: {
                text: null
            },
            labels: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: null
            }
        },
        series: [{
            name: '用電量',
            data: initialData.map(entry => entry.power)
        }],
        legend: {
            enabled: false
        }
    });

    // 使 chart 在 updateChart 中可訪問
    window.chart = chart;
});

// 確保 selectrange 在全局範圍內可訪問
window.selectrange = selectrange;
window.selectdevice = selectdevice;

var selecteddevice = "";

function selectdevice(){
    selecteddevice = document.getElementById("yyds").value;
}

function selectrange() {
    var selectedDate = document.getElementById("dayweek").value;
    var url = `/getrange`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: selectedDate })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Received data:", data); // 檢查接收到的資料格式
        if (data.error) {
            console.error('錯誤：', data.error);
        } else {
            // 更新 用電量趨勢 Highcharts 圖表
            // 遍歷 data 陣列，找到與 selecteddevice 匹配的插座數據
            for (let i = 0; i < data.length; i++) {
                if (data[i]['plugin'] === selecteddevice) {
                    // alert(JSON.stringify(data[i].data))
                    updateChart(data[i].data);
                    break;
                }
            }

            // 更新 用電量排名 Highcharts 圖表
            const totalPowers = data.map(item => {
                const totalPower = item.data.reduce((acc, entry) => acc + entry.power, 0);
                return { plugin: item.plugin, totalPower: totalPower };
            });
            // 按照插座名稱進行排序
            totalPowers.sort((a, b) => {
                const numA = parseInt(a.plugin.replace('插座', ''));
                const numB = parseInt(b.plugin.replace('插座', ''));
                return numA - numB;
            });
            updateRankingChart(totalPowers);
        }
    })
    .catch(error => console.error('錯誤：', error));
}

document.addEventListener('DOMContentLoaded', function () {
    const initialData = [];

    const chart = Highcharts.chart('realtime', {
        chart: {
            width: 400,
            height: 250,
            style: {
                borderRadius: '10px'
            },
            margin: [70, 40, 50, 60]
        },
        credits: {
            enabled: false
        },
        title: {
            text: '當前用電情況',
            style: {
                fontSize: '18px'
            },
            x: -95,
            y: 25
        },
        xAxis: {
            type: 'category', // 將 x 軸類型設置為類別
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            max: 0.3,
            title: {
                text: null
            }
        },
        series: [{
            name: 'Initial Series',
            data: initialData // 初始化數據
        }],
        legend: {
            enabled: false
        }
    });

    // 更新圖表函式
    function updateChart(data) {
        // 新數據點
        const newDataPoint = [data[4].substring(10), data[2]];
        
        // 更新數據序列
        const seriesData = chart.series[0].options.data;
        seriesData.push(newDataPoint);

        // 如果數據點超過十個，則截斷前面的數據點
        if (seriesData.length > 4) {
            seriesData.shift();
        }

        // 更新圖表
        chart.series[0].setData(seriesData);
    }

    // 定義 getnew 函式
    function getnew() {
        var url = '/getnowdata';
        fetch(url, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateChart(data); // 呼叫更新圖表函式
        })
        .catch(error => alert(error));
    }

    // 呼叫 getnew() 函式，每一秒更新一次
    setInterval(getnew, 1000);
});

function get_device() {
    var url = `/get_device`;

    fetch(url, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('錯誤：', data.error);
        } else {
            var select = document.getElementById("yyds");
            // 清空現有選項
            select.innerHTML = '<option value="">選擇插座</option>';

            // 添加新選項
            data.forEach(device => {
                var option = document.createElement("option");
                option.value = device;
                option.textContent = device;
                select.appendChild(option);
            });

            console.log('成功取得裝置：', data);
        }
    })
    .catch(error => console.error('錯誤：', error));
}

function getpay() {
    var url = `/getpay`;

    fetch(url, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('錯誤：', data.error);
        } else {

            console.log('成功取得裝置：', data);
             // 將資料轉換為浮點數並保留小數點後兩位
             var paymentAmount = parseFloat(data).toFixed(2);
            
             var paymentElement = document.getElementById("charge");
             paymentElement.innerHTML = paymentAmount;
        }
    })
    .catch(error => console.error('錯誤：', error));
}

window.onload = function() {
    get_device();
}

var get_llm_date = "";

function GetLLMDate(text) {
    var string = "智慧用電量分析 ： 本" + text;
    document.getElementById("llm-title").innerText = string;
    
    if (text == "日") {
        get_llm_date = 'day';
    } else if (text == "週") {
        get_llm_date = 'week';
    } else if (text == "月") {
        get_llm_date = 'month';
    } else if (text == "年") {
        get_llm_date = 'year';
    }

    var url = `/process_string`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: get_llm_date })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Received data:", data); // 檢查接收到的資料格式
        if (data.error) {
            console.error('錯誤：', data.error);
        } else {
            // alert(data);
        }
    })
    .catch(error => console.error('錯誤：', error));
}

setInterval(getpay, 5000);
setInterval(getnew, 5000);