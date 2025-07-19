
import React from 'react'
import {Chart, ArcElement} from "chart.js"
import {Doughnut} from "react-chartjs-2";
import Label from './Label';


Chart.register(ArcElement);

// const data = {
//   labels: [
//     'Red',
//     'Blue',
//     'Yellow'
//   ],
//   datasets: [{
//     label: 'My First Dataset',
//     data: [300, 50, 100],
//     backgroundColor: [
//       'rgb(255, 99, 132)',
//       'rgb(54, 162, 235)',
//       'rgb(255, 205, 86)'
//     ],
//     hoverOffset: 4,
//   }],
//   options:{
//     cutout:115
//     }
// };


const config = {
  data: {
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4,
      borderRadius:30,
      spacing:10
    }]
  },
  options:{
    cutout:115
    }
}
const Graph = () => {
  return (
    <div className='flex justify-center max-w-xs mx-auto'>
      <div className="item">
        <div className="chart relative">
         <Doughnut {...config}></Doughnut>
         <h3 className='mb-4 font-bold title text-white'>Total <span className='block text-3xl text-emerald-400'>${0}</span></h3>
        </div>
        <div className="flex flex-col py-10 gap-4">
          {/* labels */}
          <Label></Label>
        </div>
      </div>
    </div>
  )
}

export default Graph