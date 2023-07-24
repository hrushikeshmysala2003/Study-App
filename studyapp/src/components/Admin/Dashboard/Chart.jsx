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

const Chart = () => {
  return (
    <div>
        Chart
    </div>
  )
}

export default Chart
