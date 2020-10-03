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
  padding: 10px;
  margin-bottom: 10px;
`;

const DataWindowCon = styled.div`
  display: flex;
  flex-direction: row;
`;

const titles: string[] = ["Cases", "Deaths", "Recoveries"];

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
          title={titles[0]}
          total={data?.TotalConfirmed}
          increase={data?.NewConfirmed}
        />
        <DataSubWindow
          title={titles[1]}
          total={data?.TotalDeaths}
          increase={data?.NewDeaths}
        />
        <DataSubWindow
          title={titles[2]}
          total={data?.TotalRecovered}
          increase={data?.NewRecovered}
        />
      </DataWindowCon>
    </Container>
  );
};
