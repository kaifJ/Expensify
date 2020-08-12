import React from 'react'
import CanvasJSReact from '../assets/canvas/canvasjs.react'
var CanvasJS = CanvasJSReact.CanvasJS
var CanvasJSChart = CanvasJSReact.CanvasJSChart

const PieChart = props => {
    let dataPoints = []

    for(let [key, percent] of Object.entries(props.categories)){
        debugger
        dataPoints.push({
            label: key.toUpperCase(),
            y: percent.percent
        })
    }
    
    const options = {
        title: {
          text: `Expenses For The Month:  $${props.total}`
        },
        data: [{				
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints
         }]
     }
    return (
        <div class="stats__pie__chart">
            <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
            />
        </div>
    )
}

export default PieChart