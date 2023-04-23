// import React, { useState, useEffect } from 'react';
// import ApexCharts from 'apexcharts'



// export const LineGraph = () => {

//     const [data, setData] = useState({});

//     const buildChartData = (data, casesType = 'cases') => {
//         const chartData = [];
//         let lastDataPoint;
//         for (let date in data.cases) {
//             if (lastDataPoint) {
//                 const newDataPoint = {
//                     x: date,
//                     y: data[casesType][date] - lastDataPoint,
//                 };
//                 chartData.push(newDataPoint);
//             }
//             lastDataPoint = data[casesType][date];
//         }
//         return chartData;
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
//                 .then(response => response.json())
//                 .then(data => {
//                     let chartData = buildChartData(data, "cases");
//                     setData(chartData);
//                 });
//         }
//         fetchData();
//     }, []);

//     const options = {
//         chart: {
//             type: 'area',
//             stacked: false,
//             height: 350,
//             zoom: {
//                 type: 'x',
//                 enabled: true,
//                 autoScaleYaxis: true
//             },
//             toolbar: {
//                 autoSelected: 'zoom'
//             }
//         },
//         dataLabels: {
//             enabled: false
//         },
//         markers: {
//             size: 0,
//         },
//         title: {
//             text: 'Stock Price Movement',
//             align: 'left'
//         },
//         fill: {
//             type: 'gradient',
//             gradient: {
//                 shadeIntensity: 1,
//                 inverseColors: false,
//                 opacityFrom: 0.5,
//                 opacityTo: 0,
//                 stops: [0, 90, 100]
//             },
//         },
//         yaxis: {
//             labels: {
//                 formatter: function (val) {
//                     return (val / 1000000).toFixed(0);
//                 },
//             },
//             title: {
//                 text: 'Price'
//             },
//         },
//         xaxis: {
//             type: 'datetime',
//         },
//         tooltip: {
//             shared: false,
//             y: {
//                 formatter: function (val) {
//                     return (val / 1000000).toFixed(0)
//                 }
//             }
//         }
//     };


//     return (
//         <div>
//             {data?.length > 0 && (
//                 <div>
//                     <ApexCharts options={options} series={data} type="area" height={350} />
//                 </div>

//             )
//             }

//         </div >
//     );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const LineGraph = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
            );
            const { cases } = response.data;
            const chartData = {
                labels: Object.keys(cases),
                datasets: [
                    {
                        label: 'Cases',
                        data: Object.values(cases),
                    },
                ],
            };
            setData(chartData);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const chart = new Chart(document.getElementById('line-chart'), {
            type: 'line',
            data: data,
            options: {},
        });
        return () => {
            chart.destroy();
        };
    }, [data]);

    return <canvas id="line-chart"></canvas>;
};

export default LineGraph;
