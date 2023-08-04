import React from 'react'
import {
    Chart as ChartJs, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    ArcElement, 
    Legend} from "chart.js"

import { Line, Doughnut } from "react-chartjs-2"

ChartJs.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    ArcElement, 
    Legend, 
)

export const LineChart = ({viewsArray =[]}) => {
  const labels = getLastYearMonth();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "botton"
      },
      title: {
        display: true,
        text: "Yearly Views"
      }
    }
  }

  const data = {

    labels,
    datasets: [
      {
        label: "Views",
        data: viewsArray,
        borderColor: "rgba(107, 70, 193, 0.5)",
        backgroundColor: "#6b46c1"
      }
    ]
  }
  return (
    <Line options={options} data={data} />
  )
}

export const DoughnutChart = ({users= []}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "botton"
      },
      title: {
        display: true,
        text: "Yearly Views"
      }
    }
  }

  const data = {

    labels: ["Subscribed", "Not Subscribed"],
    datasets: [
      {
        label: "Views",
        data: users,
        borderColor: ["rgba(62, 12, 171)", "rgba(214, 43, 129)"],
        backgroundColor: ["rgba(62, 12, 171, 0.3)", "rgba(214, 43, 129, 0.3)"],
        borderWidth: 1
      }
    ]
  }

  return (
    <Doughnut data={data} options={options} />
  )

}

function getLastYearMonth(){
  const labels=[];

  const month=[
    "January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"
]
  const currentMonth = new Date().getMonth();
  const remain = 11-currentMonth;

  for (let i = currentMonth; i < month.length; i--) {
    const element = month[i];
    labels.push(element);
    if(i==0) break;
    
  }

  for (let i = 11; i > remain; i--) {
    const element = month[i];
    labels.push(element);
    if(i==currentMonth) break;
  }

  labels.pop();

  return labels;

}
