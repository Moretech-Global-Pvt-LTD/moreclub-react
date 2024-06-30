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

const UserChart = ({pointsdata}) => {

  // console.log("chartdata", refersData,  pointsdata)

     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Points History',
          },
        },
      };
      

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'];

const currentMonthIndex = moment().month();

// Rearrange the months to end with the current month
const rearrangedLabels = [...labels.slice(currentMonthIndex + 1), ...labels.slice(0, currentMonthIndex + 1)];

// Extract the data for the specified labels
//   const extractedBillingsData = rearrangedLabels.map(label => billingsData[label].transactions);
  const extractedPointsData = rearrangedLabels.map(label => pointsdata[label].points);

    
      
    const data = {
        labels: rearrangedLabels,
        datasets: [
          {
            label: 'Points transaction',
            data: extractedPointsData,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

  return (
    <Col sm={12} md={6} className="my-4" style={{minHeight:"7rem"}}>
      <Line options={options} data={data} />
    </Col>
  );
};

export default UserChart;
