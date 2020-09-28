import * as React from "react";
import { Country, Global } from "./API";
import styled from "styled-components";
import { DataSubWindow } from "./DataSubWindow";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  border: 1px solid grey;
  border-radius: 15px;
`;

const DataWindowCon = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DataWindow = ({
  title,
  data,
}: {
  title: string | undefined;
  data: Country | Global | undefined;
}) => {
  return (
    <Container>
      <h2>{title}</h2>
      <DataWindowCon>
        <DataSubWindow
          title={"Cases"}
          total={data?.TotalConfirmed}
          increase={data?.NewConfirmed}
        />
        <DataSubWindow
          title={"Deaths"}
          total={data?.TotalDeaths}
          increase={data?.NewDeaths}
        />
        <DataSubWindow
          title={"Recoveries"}
          total={data?.TotalRecovered}
          increase={data?.NewRecovered}
        />
      </DataWindowCon>
    </Container>
  );
};
