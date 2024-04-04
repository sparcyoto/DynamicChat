"use client";
import React, { useEffect, memo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ChartComponent = memo(() => {
  useEffect(() => {
    Highcharts.setOptions({
      colors: ["#01BAF2", "#71BF45", "#FAA74B"],
    });
  }, []);

  const options = {
    chart: {
      backgroundColor: "#dae2e7",
      borderRadius: 8,
      plotShadow: false,
      type: "pie",
    },
    legend: {
      // enabled: false,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        borderRadius: 0,
        borderColor: "black",
        // allowPointSelect: true,
        // cursor: "pointer",
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.key + " - " + this.y + "%" + `  ($${this.y * 1000})`;
          },
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Composition",
        colorByPoint: true,
        // slicedOffset: 0,
        innerSize: "90%",
        dataLabels: {
          connectorShape: "straight",
        },
        data: [
          {
            name: "EC2",
            color: "#313bd3",
            y: 30,
          },
          {
            name: "RDS",
            color: "purple",
            y: 20,
          },
          {
            name: "S3",
            color: "pink",
            y: 20,
          },
          {
            name: "Open Search",
            color: "red",
            y: 10,
          },
          {
            name: "Elasticcache",
            color: "orange",
            y: 10,
          },
          {
            name: "others",
            color: "gold",
            y: 10,
          },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
});

ChartComponent.displayName = "ChartComponent";
export default ChartComponent;
