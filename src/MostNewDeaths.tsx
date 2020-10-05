import * as React from "react";
import { Country } from "./API";

export const MostNewDeaths = ({ countries }: { countries: Country[] }) => {
  return (
    <div>
      <ol>
        <li>
          {countries[0].Country} - {countries[0].NewDeaths}
        </li>
        <li>
          {countries[1].Country} - {countries[1].NewDeaths}
        </li>
        <li>
          {countries[2].Country} - {countries[2].NewDeaths}
        </li>
      </ol>
    </div>
  );
};
