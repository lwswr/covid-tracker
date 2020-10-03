import * as React from "react";
import { Country } from "./API";

export const MostNewCases = ({ countries }: { countries: Country[] }) => {
  return (
    <div>
      {countries[0]}
      {countries[1]}
    </div>
  );
};
