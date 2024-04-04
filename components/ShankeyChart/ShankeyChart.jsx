"use client";
// import React, { useEffect, memo } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// const ChartComponent = memo(() => {
//   useEffect(() => {
//     Highcharts.setOptions({
//       colors: ["#01BAF2", "#71BF45", "#FAA74B"],
//     });
//   }, []);

//   const options = {
//     title: {
//       text: "Highcharts Sankey Diagram",
//     },
//     accessibility: {
//       point: {
//         valueDescriptionFormat:
//           "{index}. {point.from} to {point.to}, {point.weight}.",
//       },
//     },
//     series: [
//       {
//         keys: ["to", "from", "weight"],
//         data: [
//           { from: "a", to: "b", weight: 2 },
//           { from: "a", to: "g", weight: 2 },
//           { from: "b", to: "c", weight: 2 },
//           { from: "b", to: "d", weight: 2 },
//         ],
//         type: "sankey",
//         name: "Sankey demo series",
//       },
//     ],
//   };

//   //   Highcharts.chart("container", {
//   //     title: {
//   //       text: "Highcharts Sankey Diagram",
//   //     },
//   //     accessibility: {
//   //       point: {
//   //         valueDescriptionFormat:
//   //           "{index}. {point.from} to {point.to}, {point.weight}.",
//   //       },
//   //     },
//   //     series: [
//   //       {
//   //         keys: ["to", "from", "weight"],
//   //         data: [
//   //           { from: "a", to: "b", weight: 2 },
//   //           { from: "a", to: "g", weight: 2 },
//   //           { from: "b", to: "c", weight: 2 },
//   //           { from: "b", to: "d", weight: 2 },
//   //         ],
//   //         type: "sankey",
//   //         name: "Sankey demo series",
//   //       },
//   //     ],
//   //   });

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
//   return <div></div>;
// });

// ChartComponent.displayName = "ChartComponent";
// export default ChartComponent;

// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import HighchartsExporting from "highcharts/modules/exporting";
// import timeline from "highcharts/modules/timeline";

// HighchartsExporting(Highcharts);
// timeline(Highcharts);

// const Page = () => {
//   const formattedData = Object.keys(data).reduce((arr, from) => {
//     const weights = data[from];
//     return arr.concat(
//       Object.keys(weights).map((to) => [from, to, weights[to]])
//     );
//   }, []);
//   const options = {
//     title: {
//       text: "My chart",
//     },
//     series: [
//       {
//         type: "timeline",
//         data: [1, 2, 3],
//       },
//     ],
//   };

//   return (
//     <div>
//       <HighchartsReact highcharts={Highcharts} options={options} />
//     </div>
//   );
// };

// export default Page;

import React from "react";
import Highcharts from "highcharts";
import {
  HighchartsChart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  SankeySeries,
  Tooltip,
} from "react-jsx-highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import sankey from "highcharts/modules/sankey";
// import HighchartsSankey from "highcharts/modules/sankey";
// import HighchartsReact from "highcharts-react-official";

// Initialize the module
HighchartsExporting(Highcharts);
sankey(Highcharts);

const data = {
  ExcessCost: { Production: 20, staging: 3, Analytics: 2 },
  Production: { purpose: 8, Customers: 6, product: 6 },
  purpose: { WebApp: 7, API: 1, WorkFlow: 1 },
  Customers: { Amex: 4.2, citi: 1.8 },
  product: { WebApp: 3, MobileApp: 1.8, chat: 1.2 },
};

const App = () => {
  const formattedData = Object.keys(data).reduce((arr, from) => {
    const weights = data[from];
    return arr.concat(
      Object.keys(weights).map((to) => [from, to, weights[to]])
    );
  }, []);

  return (
    <div className="app">
      <HighchartsChart>
        <Title>Highcharts Sankey Diagram</Title>

        <XAxis type="category" />

        <YAxis>
          <SankeySeries
            name="Sankey demo series"
            data={formattedData}
            keys={["from", "to", "weight"]}
          />
        </YAxis>

        <Tooltip />
      </HighchartsChart>
    </div>
  );
};

export default withHighcharts(App, Highcharts);
