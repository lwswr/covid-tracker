import * as React from "react";
import { Global } from "./API";

export const GlobalWindow = (global: Global) => {
  return (
    <div>
      <h3>
        Total Global Deaths: {global.TotalDeaths} <h4>+{global.NewDeaths}</h4>
      </h3>
      <h3>
        Total Global Cases: {global.TotalConfirmed}
        <h4>+{global.NewConfirmed}</h4>
      </h3>
      <h3>
        Total Global Recoveries: {global.TotalRecovered}
        <h4>+{global.NewRecovered}</h4>
      </h3>
    </div>
  );
};
