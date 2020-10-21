import * as React from "react";

export const Selector = ({
  selectedList,
  value,
  onChange,
}: {
  selectedList: string[];
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <select
      value={value ?? selectedList}
      onChange={(e) => onChange(e.target.value)}
    >
      {selectedList.map((option: string) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};
