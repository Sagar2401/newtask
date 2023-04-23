
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
