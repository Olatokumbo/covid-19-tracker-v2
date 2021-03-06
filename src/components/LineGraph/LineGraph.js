import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getChartInfo } from "../../api";
import numeral from "numeral";

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

const LineGraph = ({casesType}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const chartData = async () => {
      setData(await getChartInfo(casesType));

    };
    chartData();
  }, [casesType]);
  return (
    <div>
    {data?.length > 0 && (
      <Line
        data={{
          datasets: [
            {
              backgroundColor: "rgba(204, 16, 52, 0.5)",
              borderColor: "#CC1034",
              data: data,
            },
          ],
        }}
        options={options}
      />
    )}
  </div>
  );
};
export default LineGraph;
