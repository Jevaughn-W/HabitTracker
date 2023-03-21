import "@toast-ui/chart/dist/toastui-chart.min.css";
import { BarChart, LineChart } from "@toast-ui/react-chart";
import React from "react";

export default function HabitChart(props) {
  const dataBarChart = {
    categories: ["January", "Februay", "March"],
    series: [
      {
        name: "Coding",
        data: [4, 5, 7],
      },
      {
        name: "Shooting",
        data: [8, 3, 8],
      },
      {
        name: "Exercise",
        data: [5, 6, 6],
      },
    ],
  };

  const dataLineChart = {
    categories: ["January", "Februay", "March"],
    series: [
      {
        name: "Coding",
        data: [4, 5, 7],
      },
      {
        name: "Shooting",
        data: [8, 3, 8],
      },
      {
        name: "Exercise",
        data: [5, 6, 6],
      },
    ],
  };

  

  const options = {
    chart: {
      width: 550,
      height: 400,
      title:
        props.selectedValue === "Line"
          ? "Amount of Habits Completed per Month"
          : "Amount of Habits Completed per Month",
    },
    yAxis: {
      title: props.selectedValue === "Line" ? "Amount" : "Month",
    },
    xAxis: {
      title: props.selectedValue === "Line" ? "Month" : "Amount",
    },
    exportMenu: {
      visible: false
    },
    legend: {
      align: 'bottom'
    }
  };

  return(
    <>
      {props.selectedValue === "Line" && (<LineChart data={dataLineChart} options={options} />)}
    
      {props.selectedValue === "Bar" && (<BarChart data={dataBarChart} options={options} />)}
    </>
  )


}