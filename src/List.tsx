import * as React from "react";
import { Country } from "./API";

export const List = ({ list, key }: { list: Country[]; key: string }) => {
  return (
    <div>
      {list.map((item, index) => {
        return (
          <div key={index}>
            {item.Country} - {item[key]}
          </div>
        );
      })}
    </div>
  );
};
