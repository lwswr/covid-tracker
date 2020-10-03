import * as React from "react";
import styled from "styled-components";

const SubWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 10px;
  width: 200px;
  height: 200px;
`;

export const DataSubWindow = ({
  title,
  total,
  increase,
}: {
  title: string;
  total: number | undefined;
  increase: number | undefined;
}) => {
  return (
    <SubWindow>
      <h6>{title}</h6>
      <h3>{total}</h3>
      <h4>+{increase}</h4>
    </SubWindow>
  );
};
