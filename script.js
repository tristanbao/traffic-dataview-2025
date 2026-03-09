// 浙江省地图GeoJSON数据
const zhejiangGeoJson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": { "name": "杭州市" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[120.19, 30.26], [120.5, 30.5], [120.3, 30.0], [119.9, 30.1], [120.19, 30.26]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "宁波市" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[121.55, 29.87], [121.8, 30.0], [121.6, 29.6], [121.3, 29.7], [121.55, 29.87]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "温州市" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[120.70, 28.00], [121.0, 28.2], [120.8, 27.7], [120.4, 27.8], [120.70, 28.00]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "绍兴市" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[120.58, 30.03], [120.8, 30.2], [120.6, 29.8], [120.3, 29.9], [120.58, 30.03]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "金华市" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[119.65, 29.08], [120.0, 29.3], [119.8, 28.8], [119.4, 28.9], [119.65, 29.08]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "嘉兴市" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[120.76, 30.77], [121.0, 31.0], [120.8, 30.5], [120.5, 30.6], [120.76, 30.77]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "台州市" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[121.43, 28.66], [121.7, 28.9], [121.5, 28.4], [121.2, 28.5], [121.43, 28.66]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "湖州市" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[120.09, 30.89], [120.4, 31.1], [120.2, 30.6], [119.8, 30.7], [120.09, 30.89]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "衢州市" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[118.87, 28.94], [119.2, 29.2], [119.0, 28.7], [118.6, 28.8], [118.87, 28.94]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "舟山市" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[122.21, 30.01], [122.5, 30.2], [122.3, 29.8], [122.0, 29.9], [122.21, 30.01]]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "丽水市" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[119.92, 28.45], [120.2, 28.7], [120.0, 28.2], [119.6, 28.3], [119.92, 28.45]]]
            }
        }
    ]
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 注册浙江省地图
    echarts.registerMap('zhejiang', zhejiangGeoJson);
    
    initNavigation();
    initScrollEffects();
    initCharts();
});

// 导航点初始化
function initNavigation() {
    const slides = document.querySelectorAll('.slide');
    const navDots = document.querySelector('.nav-dots');
    
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            slide.scrollIntoView({ behavior: 'smooth' });
        });
        navDots.appendChild(dot);
    });
}

// 滚动效果
function initScrollEffects() {
    const container = document.querySelector('.container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');
    const progressBar = document.querySelector('.progress-bar');
    
    container.addEventListener('scroll', () => {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
        
        slides.forEach((slide, index) => {
            const rect = slide.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                slide.classList.add('active');
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            }
        });
    });
}

// 初始化所有图表
function initCharts() {
    initVitalityChart();
    initNetworkChart();
    initFlowChart();
    initRadarChart();
    initMapChart();
}

// 1. 区域经济活跃度指数图表
function initVitalityChart() {
    const chart = echarts.init(document.getElementById('vitality-chart'));
    
    const cities = ['杭州市', '宁波市', '温州市', '绍兴市', '金华市', '嘉兴市', '台州市', '湖州市', '衢州市', '舟山市', '丽水市'];
    const vitalityIndex = [5238.97, 3396.52, 2301.99, 2025.43, 1966.68, 1710.07, 1227.12, 1276.23, 1013.20, 823.60, 760.85];
    const gdp = [22953.00, 19055.09, 7948.01, 4424.09, 8787.03, 7271.78, 6989.22, 10204.74, 2375.97, 2337.51, 2290.24];
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#4facfe',
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            data: ['经济活跃度指数', 'GDP (亿元)'],
            textStyle: {
                color: '#b0b8c1',
                fontSize: 14
            },
            top: 20
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: cities,
            axisLabel: {
                color: '#b0b8c1',
                rotate: 45,
                fontSize: 12
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            }
        },
        yAxis: [
            {
                type: 'value',
                name: '活跃度指数',
                position: 'left',
                axisLabel: {
                    color: '#b0b8c1'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            {
                type: 'value',
                name: 'GDP (亿元)',
                position: 'right',
                axisLabel: {
                    color: '#b0b8c1'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '经济活跃度指数',
                type: 'bar',
                data: vitalityIndex,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#4facfe' },
                        { offset: 1, color: '#00f2fe' }
                    ]),
                    borderRadius: [8, 8, 0, 0]
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#00f2fe' },
                            { offset: 1, color: '#4facfe' }
                        ])
                    }
                },
                animationDelay: function (idx) {
                    return idx * 100;
                }
            },
            {
                name: 'GDP (亿元)',
                type: 'line',
                yAxisIndex: 1,
                data: gdp,
                smooth: true,
                lineStyle: {
                    color: '#43e97b',
                    width: 3
                },
                itemStyle: {
                    color: '#43e97b'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(67, 233, 123, 0.3)' },
                        { offset: 1, color: 'rgba(67, 233, 123, 0.05)' }
                    ])
                },
                animationDelay: function (idx) {
                    return idx * 100 + 500;
                }
            }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 50;
        }
    };
    
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 2. 城际连接网络图 - 使用力导向图
function initNetworkChart() {
    const chart = echarts.init(document.getElementById('network-chart'));
    
    const cities = [
        { name: '杭州', value: 5238.97, x: 120.19, y: 30.26 },
        { name: '宁波', value: 3396.52, x: 121.55, y: 29.87 },
        { name: '温州', value: 2301.99, x: 120.70, y: 28.00 },
        { name: '绍兴', value: 2025.43, x: 120.58, y: 30.03 },
        { name: '金华', value: 1966.68, x: 119.65, y: 29.08 },
        { name: '嘉兴', value: 1710.07, x: 120.76, y: 30.77 },
        { name: '台州', value: 1227.12, x: 121.43, y: 28.66 },
        { name: '湖州', value: 1276.23, x: 120.09, y: 30.89 },
        { name: '衢州', value: 1013.20, x: 118.87, y: 28.94 },
        { name: '舟山', value: 823.60, x: 122.21, y: 30.01 },
        { name: '丽水', value: 760.85, x: 119.92, y: 28.45 }
    ];
    
    const connections = [
        { source: '杭州', target: '宁波', value: 850 },
        { source: '杭州', target: '绍兴', value: 920 },
        { source: '杭州', target: '嘉兴', value: 780 },
        { source: '杭州', target: '湖州', value: 650 },
        { source: '杭州', target: '金华', value: 720 },
        { source: '宁波', target: '绍兴', value: 680 },
        { source: '宁波', target: '台州', value: 590 },
        { source: '宁波', target: '舟山', value: 520 },
        { source: '温州', target: '台州', value: 480 },
        { source: '金华', target: '衢州', value: 420 },
        { source: '金华', target: '丽水', value: 380 },
        { source: '金华', target: '温州', value: 450 },
        { source: '嘉兴', target: '湖州', value: 350 }
    ];
    
    const nodes = cities.map(city => ({
        name: city.name,
        value: city.value,
        symbolSize: Math.sqrt(city.value) / 2.5,
        itemStyle: {
            color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [
                { offset: 0, color: '#4facfe' },
                { offset: 1, color: '#00f2fe' }
            ]),
            shadowBlur: 20,
            shadowColor: 'rgba(79, 172, 254, 0.5)'
        },
        label: {
            show: true,
            color: '#fff',
            fontSize: 13,
            fontWeight: 'bold',
            position: 'bottom',
            distance: 5
        }
    }));
    
    const links = connections.map(conn => ({
        source: conn.source,
        target: conn.target,
        value: conn.value,
        lineStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: 'rgba(79, 172, 254, 0.6)' },
                { offset: 1, color: 'rgba(67, 233, 123, 0.6)' }
            ]),
            width: conn.value / 150,
            curveness: 0.2,
            shadowBlur: 10,
            shadowColor: 'rgba(79, 172, 254, 0.3)'
        }
    }));
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#4facfe',
            textStyle: {
                color: '#fff'
            },
            formatter: function(params) {
                if (params.dataType === 'node') {
                    return `<strong>${params.name}</strong><br/>活跃度: ${params.value.toFixed(2)}`;
                } else if (params.dataType === 'edge') {
                    return `${params.data.source} ⇄ ${params.data.target}<br/>连接强度: ${params.data.value}`;
                }
            }
        },
        series: [
            {
                type: 'graph',
                layout: 'force',
                data: nodes,
                links: links,
                roam: true,
                label: {
                    show: true
                },
                force: {
                    repulsion: 1000,
                    gravity: 0.1,
                    edgeLength: [100, 200],
                    layoutAnimation: true
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 6
                    },
                    itemStyle: {
                        shadowBlur: 30,
                        shadowColor: 'rgba(79, 172, 254, 0.8)'
                    }
                },
                animationDuration: 1500,
                animationEasingUpdate: 'quinticInOut'
            }
        ]
    };
    
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 3. 产业流动性指数月度变化
function initFlowChart() {
    const chart = echarts.init(document.getElementById('flow-chart'));
    
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    
    const data = {
        '杭州': [84.53, 85.77, 81.69, 82.38, 83.17, 82.19, 84.67, 84.06, 83.06, 84.48, 83.36, 83.73],
        '宁波': [27.06, 31.34, 32.08, 31.13, 29.31, 28.72, 29.93, 29.07, 29.26, 30.58, 29.95, 29.37],
        '温州': [93.64, 100.00, 91.74, 92.68, 92.52, 91.49, 94.80, 91.29, 94.85, 91.15, 90.80, 90.25],
        '金华': [36.30, 30.82, 35.94, 34.96, 36.20, 36.62, 35.58, 36.86, 37.68, 37.31, 37.64, 37.69],
        '嘉兴': [92.13, 86.90, 88.89, 90.50, 90.84, 96.20, 97.68, 96.81, 94.96, 93.30, 94.79, 95.21]
    };
    
    const colors = ['#4facfe', '#43e97b', '#f093fb', '#feca57', '#ff6b6b'];
    
    const series = Object.keys(data).map((city, index) => ({
        name: city,
        type: 'line',
        data: data[city],
        smooth: true,
        lineStyle: {
            width: 3,
            color: colors[index]
        },
        itemStyle: {
            color: colors[index]
        },
        areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: colors[index] + '40' },
                { offset: 1, color: colors[index] + '10' }
            ])
        },
        emphasis: {
            focus: 'series'
        },
        animationDelay: function (idx) {
            return idx * 50;
        }
    }));
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#4facfe',
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            data: Object.keys(data),
            textStyle: {
                color: '#b0b8c1',
                fontSize: 14
            },
            top: 20
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: months,
            boundaryGap: false,
            axisLabel: {
                color: '#b0b8c1'
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '流动性指数',
            axisLabel: {
                color: '#b0b8c1'
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        },
        series: series,
        animationEasing: 'cubicOut'
    };
    
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 4. 重点城市多维度雷达图
function initRadarChart() {
    const chart = echarts.init(document.getElementById('radar-chart'));
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#4facfe',
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            data: ['杭州', '宁波', '温州'],
            textStyle: {
                color: '#b0b8c1',
                fontSize: 14
            },
            top: 20
        },
        radar: {
            indicator: [
                { name: '经济活跃度', max: 100 },
                { name: '城际连接度', max: 100 },
                { name: '产业流动性', max: 100 },
                { name: 'GDP规模', max: 100 },
                { name: '交通便利度', max: 100 },
                { name: '发展潜力', max: 100 }
            ],
            center: ['50%', '55%'],
            radius: '60%',
            splitNumber: 4,
            name: {
                textStyle: {
                    color: '#b0b8c1',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: [
                        'rgba(79, 172, 254, 0.05)',
                        'rgba(79, 172, 254, 0.1)',
                        'rgba(79, 172, 254, 0.15)',
                        'rgba(79, 172, 254, 0.2)'
                    ]
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            }
        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: [100, 95, 85, 100, 95, 90],
                        name: '杭州',
                        areaStyle: {
                            color: 'rgba(79, 172, 254, 0.3)'
                        },
                        lineStyle: {
                            color: '#4facfe',
                            width: 2
                        },
                        itemStyle: {
                            color: '#4facfe'
                        }
                    },
                    {
                        value: [65, 85, 75, 83, 90, 85],
                        name: '宁波',
                        areaStyle: {
                            color: 'rgba(67, 233, 123, 0.3)'
                        },
                        lineStyle: {
                            color: '#43e97b',
                            width: 2
                        },
                        itemStyle: {
                            color: '#43e97b'
                        }
                    },
                    {
                        value: [44, 60, 95, 35, 70, 75],
                        name: '温州',
                        areaStyle: {
                            color: 'rgba(240, 147, 251, 0.3)'
                        },
                        lineStyle: {
                            color: '#f093fb',
                            width: 2
                        },
                        itemStyle: {
                            color: '#f093fb'
                        }
                    }
                ],
                emphasis: {
                    lineStyle: {
                        width: 4
                    }
                },
                animationDelay: function (idx) {
                    return idx * 200;
                }
            }
        ]
    };
    
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 5. 浙江省地图热力图
function initMapChart() {
    const chart = echarts.init(document.getElementById('map-chart'));
    
    const data = [
        { name: '杭州市', value: 5238.97 },
        { name: '宁波市', value: 3396.52 },
        { name: '温州市', value: 2301.99 },
        { name: '绍兴市', value: 2025.43 },
        { name: '金华市', value: 1966.68 },
        { name: '嘉兴市', value: 1710.07 },
        { name: '台州市', value: 1227.12 },
        { name: '湖州市', value: 1276.23 },
        { name: '衢州市', value: 1013.20 },
        { name: '舟山市', value: 823.60 },
        { name: '丽水市', value: 760.85 }
    ];
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#4facfe',
            textStyle: {
                color: '#fff'
            },
            formatter: function(params) {
                return `<strong>${params.name}</strong><br/>经济活跃度: ${params.value ? params.value.toFixed(2) : '暂无数据'}`;
            }
        },
        visualMap: {
            min: 0,
            max: 5500,
            text: ['高', '低'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['#0a1f44', '#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe']
            },
            textStyle: {
                color: '#b0b8c1'
            },
            left: 'left',
            bottom: '10%'
        },
        series: [
            {
                name: '经济活跃度',
                type: 'map',
                map: 'zhejiang',
                roam: true,
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 12
                },
                itemStyle: {
                    areaColor: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    borderWidth: 1.5
                },
                emphasis: {
                    label: {
                        show: true,
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bold'
                    },
                    itemStyle: {
                        areaColor: 'rgba(79, 172, 254, 0.5)',
                        borderColor: '#4facfe',
                        borderWidth: 2,
                        shadowBlur: 20,
                        shadowColor: 'rgba(79, 172, 254, 0.5)'
                    }
                },
                data: data,
                animationDuration: 1000,
                animationEasing: 'cubicOut'
            }
        ]
    };
    
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}
