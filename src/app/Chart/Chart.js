import React from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export function Chart (props) {

  const dataPointsMock = props.newsArray.map((row) => {
    const obj = {
      label : row.objectID,
      y : row.points
    }
    return obj;
  });

  const options = {
    animationEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    axisY: {
      title: "Votes",
      includeZero: false,
      interval: 250
    },
    axisX: {
      title: "ID",
      prefix: "W",
      interval: 1
    },
    data: [{
      type: "line",
      toolTipContent: "Votes for {label} is {y}",
      dataPoints: dataPointsMock
    }]
  }

  return (
    <CanvasJSChart options = {options} />
  );
};