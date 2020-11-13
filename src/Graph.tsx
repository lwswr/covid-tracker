import * as React from "react";
import { Line } from "react-chartjs-2";
import { StatusResponse } from "./API";
import styled from "styled-components";
import { ListOption } from "./state";

const GraphWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  border: 1px solid grey;
  padding: 30px;
  margin: 5px 0px;
  border-radius: 15px;
`;

function getDifference(arr: number[]) {
  let newArr: number[] = [];
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i] - arr[i - 1] >= 0) {
      newArr.push(arr[i] - arr[i - 1]);
    }
  }
  return newArr;
}

function checkForListType(item: ListOption) {
  if (item === "Cases") {
    return "Confirmed";
  } else if (item === "Deaths") {
    return item;
  }
  return item;
}

export const Graph = ({
  chartData,
  listChoice,
}: {
  chartData: StatusResponse;
  listChoice: ListOption;
}) => {
  const graphDates: string[] = chartData.map((datum) => datum.Date);
  const graphData: number[] = getDifference(
    chartData.map((datum) => datum[checkForListType(listChoice)])
  );
  const graphLabel: string = chartData[0].Country + " New " + listChoice;

  return (
    <GraphWindow>
      <Line
        data={{
          labels: graphDates,
          datasets: [
            {
              label: graphLabel,
              data: graphData,
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
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "month",
                },
              },
            ],
          },
        }}
      />
    </GraphWindow>
  );
};
