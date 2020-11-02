import * as React from "react";
import { Country } from "./API";
import styled from "styled-components";

const Table = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid grey;
  border-radius: 15px;
`;

const TableColumn = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0px;
  :nth-child(n + 2) {
    border-top: 1px solid lightgrey;
  }
`;

const TableHeaderCountry = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 15px;
  padding-right: 10px;
  width: 200px;
`;

const TableHeaderOther = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 15px;
  padding-right: 10px;
  width: 200px;
`;

const TableCountry = styled.div`
  font-size: 15px;
  padding-right: 10px;
  width: 200px;
`;
const TableTotal = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 15px;
  padding-right: 10px;
  width: 200px;
`;
const TableIncrease = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 15px;
  padding-right: 10px;
  width: 200px;
`;

export const List = ({
  list,
  displayKey,
  secondaryDisplayKey,
  selectedList,
}: {
  list: Country[];
  displayKey: string;
  secondaryDisplayKey: string;
  selectedList: string;
}) => {
  return (
    <Table>
      <TableColumn>
        <TableHeaderCountry>Country</TableHeaderCountry>
        <TableHeaderOther>Total {selectedList}</TableHeaderOther>
        <TableHeaderOther>Increase in {selectedList}</TableHeaderOther>
      </TableColumn>

      {list.map((item, index) => {
        return (
          <TableColumn key={index}>
            <TableCountry>{item.Country}</TableCountry>
            <TableTotal>{item[displayKey]}</TableTotal>
            <TableIncrease>+{item[secondaryDisplayKey]}</TableIncrease>
          </TableColumn>
        );
      })}
    </Table>
  );
};
