import * as React from "react";
import { Global } from "./API";

export const GlobalWindow = ({ global }: { global: Global }) => {
  return (
    <div>
      <h3>
        Total Global Deaths: {global.TotalDeaths} <div>+{global.NewDeaths}</div>
      </h3>
      <h3>
        Total Global Cases: {global.TotalConfirmed}
        <div>+{global.NewConfirmed}</div>
      </h3>
      <h3>
        Total Global Recoveries: {global.TotalRecovered}
        <div>+{global.NewRecovered}</div>
      </h3>
    </div>
  );
};
