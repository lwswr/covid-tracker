import * as React from "react";
import styled from "styled-components";

const Select = styled.select`
  font-size: 25px;
  border: 0;
  border-bottom: 1px solid white;
  background: white;
  color: black;
  font-family: "Montserrat", sans-serif;
  transition: 0.2s;
  :hover {
    border-bottom: 1px solid grey;
  }
`;

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
    <Select
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
    </Select>
  );
}
