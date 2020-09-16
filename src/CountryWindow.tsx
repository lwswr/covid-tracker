import * as React from "react";
import { Country } from "./API";

export const CountryWindow = (country: Country) => {
  return (
    <div>
      <h3>
        {country.Country} Deaths: {country.TotalDeaths}
      </h3>
    </div>
  );
};
