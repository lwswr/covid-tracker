import * as React from "react";

export function Selector<T extends string>({
  selectedList,
  value,
  onChange,
}: {
  selectedList: Readonly<T[]>;
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <select
      value={value ?? selectedList}
      onChange={(e) => onChange(e.target.value as any)}
    >
      {selectedList.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
