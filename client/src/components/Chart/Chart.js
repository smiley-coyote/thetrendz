import React from 'react';
import { Line } from 'react-chartjs-2';
import './Chart.css';

const Chart = ({data}) => {
  const {labels, values} = data;
  console.log(values);
  return (
    <div className='Chart' style={styles.graphContainer}>
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: 'Bill Gates',
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data: values
            }
          ]
        }}
        options={options}
         height="250"
      />
    </div>
  )
}

const options = {
  scaleShowGridLines: true,
  scaleGridLineColor: 'rgba(0,0,0,.05)',
  scaleGridLineWidth: 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 20,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true
}

const styles = {
  graphContainer: {
    border: '1px solid black',
    padding: '15px'
  }
}

export default Chart;