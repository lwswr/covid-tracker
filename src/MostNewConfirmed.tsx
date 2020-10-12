import * as React from "react";
import { Country } from "./API";

export const MostNewConfirmed = ({ countries }: { countries: Country[] }) => {
  return (
    <div>
      <ol>
        <li>
          {countries[0].Country} - {countries[0].NewConfirmed}
        </li>
        <li>
          {countries[1].Country} - {countries[1].NewConfirmed}
        </li>
        <li>
          {countries[2].Country} - {countries[2].NewConfirmed}
        </li>
      </ol>
    </div>
  );
};
