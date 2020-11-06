import * as React from "react";
import { Country } from "./API";
import styled from "styled-components";
import { ListOption } from "./state";
import { motion } from "framer-motion";

const Table = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
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
  width: 33%;
`;

const TableHeaderOther = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 15px;
  padding-right: 10px;
  width: 33%;
`;

const TableCountry = styled.div`
  font-size: 15px;
  padding-right: 10px;
  width: 33%;
`;
const TableTotal = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 15px;
  padding-right: 10px;
  width: 33%;
`;
const TableIncrease = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 15px;
  padding-right: 10px;
  width: 33%;
`;

export const List = ({
  list,
  displayKey,
  secondaryDisplayKey,
  selectedList,
}: {
  list: Country[];
  displayKey: keyof Country;
  secondaryDisplayKey: keyof Country;
  selectedList: ListOption;
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
