import React from "react";
import { Col } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import moment from "moment";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const RefrealChart = ({refersData}) => {
     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Referals History',
          },
        },
      };
      
      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const currentMonthIndex = moment().month();
  
      const rearrangedLabels = [...labels.slice(currentMonthIndex + 1), ...labels.slice(0, currentMonthIndex + 1)];

      const extractedrefersData = rearrangedLabels.map(label => refersData[label]);
    
      
    const data = {
        labels: rearrangedLabels,
        datasets: [
          {
            label: 'Refers',
            data: extractedrefersData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

  return (
    <Col sm={12} md={6} className="my-4 d-none d-md-block" style={{minHeight:"7rem"}} >
      <Line options={options} data={data} />
    </Col>
  );
};

export default RefrealChart;
