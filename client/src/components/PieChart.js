import React, {Fragment} from 'react'
import CanvasJSReact from '../assets/canvas/canvasjs.react'
var CanvasJS = CanvasJSReact.CanvasJS
var CanvasJSChart = CanvasJSReact.CanvasJSChart

const PieChart = props => {
    const options = {
        title: {
          text: "Basic Column Chart in React"
        },
        data: [{				
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { label: "Apple",  y: 10  },
                { label: "Orange", y: 15  },
                { label: "Banana", y: 25  },
                { label: "Mango",  y: 30  },
                { label: "Grape",  y: 28  }
            ]
         }]
     }
    return (
        <Fragment>
            <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
            />
        </Fragment>
    )
}

export default PieChart