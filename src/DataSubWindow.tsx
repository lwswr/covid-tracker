import * as React from "react";
import styled from "styled-components";

const SubWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 10px 10px 10px 30px;
  width: 33%;
  height: 75px;
  :nth-child(n + 2) {
    border-left: 1px solid lightgrey;
  }
`;

const Title = styled.div`
  font-size: 15px;
`;

const Total = styled.div`
  font-size: 25px;
`;
const Increase = styled.div`
  font-size: 20px;
`;

export const DataSubWindow = ({
  subTitle,
  total,
  increase,
}: {
  subTitle: string;
  total: number | undefined;
  increase: number | undefined;
}) => {
  return (
    <SubWindow>
      <Title>
        <strong>{subTitle}</strong>
      </Title>
      <Total>{total}</Total>
      <Increase>+{increase}</Increase>
    </SubWindow>
  );
};
