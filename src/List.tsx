import * as React from "react";
import { Country } from "./API";

export const List = ({
  list,
  displayKey,
}: {
  list: Country[];
  displayKey: string;
}) => {
  return (
    <div>
      {list.map((item, index) => {
        return (
          <div key={index}>
            {item.Country} - {item[displayKey]}
          </div>
        );
      })}
    </div>
  );
};
