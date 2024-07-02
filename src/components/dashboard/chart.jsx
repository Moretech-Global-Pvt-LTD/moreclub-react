import React, { useState } from "react";
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
} from "chart.js";
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

const Chart = ({ refersData, pointsdata, billingsData }) => {
  const getInitialTheme = () => {
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        color: theme === "dark" ? "#FFFFFF" : "#000000", // Set the legend label color based on theme
        fontSize: 14,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              color: theme === "dark" ? "#FFFFFF" : "#000000", // Set the y-axis label color based on theme
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              color: theme === "dark" ? "#FFFFFF" : "#000000", // Set the x-axis label color based on theme
            },
          },
        ],
      },
      title: {
        display: true,
        text: "Points Transactions History",
      },
    },
  };

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonthIndex = moment().month();

  // Rearrange the months to end with the current month
  const rearrangedLabels = [
    ...labels.slice(currentMonthIndex + 1),
    ...labels.slice(0, currentMonthIndex + 1),
  ];

  // Extract the data for the specified labels
  const extractedBillingsData = rearrangedLabels.map(
    (label) => billingsData[label].points
  );
  const extractedPointsData = rearrangedLabels.map(
    (label) => pointsdata[label].points
  );
  // const extractedrefersData = rearrangedLabels.map(label => refersData[label]);

  const data = {
    labels: rearrangedLabels,
    datasets: [
      // {
      //   label: 'Refers',
      //   data: extractedrefersData,
      //   borderColor: 'rgb(255, 99, 132)',
      //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
      // },
      {
        label: "Points transaction",
        data: extractedPointsData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        color: theme === "dark" ? "#FFFFFF" : "#000000",
      },
      {
        label: "Billings transaction",
        data: extractedBillingsData,
        borderColor: "rgb(255, 223, 0)",
        backgroundColor: "rgba(255, 223, 0, 0.5)",
        color: theme === "dark" ? "#FFFFFF" : "#000000",
      },
    ],
  };

  return (
    <Col
      sm={12}
      md={6}
      className="my-4 "
      style={{ minHeight: "7rem", Width: "100%" }}
    >
      <Line
        options={options}
        data={data}
        style={{ Width: "100%", height: "auto" }}
      />
    </Col>
  );
};

export default Chart;
