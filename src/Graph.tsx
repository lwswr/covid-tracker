import * as React from "react";
import { Line } from "react-chartjs-2";
import { StatusResponse } from "./API";

export type DataType = number[];
export type DatesType = string[];

function getDifference(arr: number[]) {
  let newArr: number[] = [];
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i] - arr[i - 1] >= 0) {
      newArr.push(arr[i] - arr[i - 1]);
    }
  }
  return newArr;
}

export const Graph = ({ chartData }: { chartData: StatusResponse }) => {
  const dates: DatesType = chartData.map((datum) => datum.Date);
  const data: DataType = chartData.map((datum) => datum.Cases);

  const newData: DataType = getDifference(data);

  return (
    <div>
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              label: chartData[0].Country,
              data: newData,
            },
          ],
        }}
        height={500}
        width={800}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};
