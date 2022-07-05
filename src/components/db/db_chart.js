import React from 'react';
import { Container, Row, Alert, Col, Card } from 'react-bootstrap'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
  );
ChartJS.defaults.font.size = "50rem";
ChartJS.defaults.font.weight = "bold";

ChartJS.defaults.set('plugins.datalabels', {
    color: '#FE777B',
    font: {
        weight: 'bold',
        size: '50rem',
      }
  });







const Chart = (props) => {
  console.log("from chart-arrdata", props.chart);
  const label = props.chart.map((ar) => ar.label);
  const value = props.chart.map((ar) => ar.value);
  const options = {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 16,

          },
        },
      },
      title: {
        display: false,
        text: "ตรวจยึดของกลาง",
      },
    },
  };
  const data = {
    labels: label,
    datasets: [
      {
        display: false,
        label: "จำนวน",
        data: value,
        backgroundColor: "#140E32",
      },
    ],
  };

  console.log("from chart-arr-key", label);
  console.log("from chart-arr-value", value);

  return (<><Bar options={options} data={data} /></>)
  
    
    

    
    
};
export default Chart



