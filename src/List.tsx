import * as React from "react";
import { Country } from "./API";

export const List = ({
  list,
  displayKey,
  secondaryDisplayKey,
}: {
  list: Country[];
  displayKey: string;
  secondaryDisplayKey: string;
}) => {
  return (
    <div>
      {list.map((item, index) => {
        return (
          <div key={index}>
            {item.Country} - {item[displayKey]} +{item[secondaryDisplayKey]}
          </div>
        );
      })}
    </div>
  );
};
