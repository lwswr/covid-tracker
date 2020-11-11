import * as React from "react";
import { Country, Global } from "./API";
import styled from "styled-components";
import { DataSubWindow } from "./DataSubWindow";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 10px;
  margin-bottom: 10px;
`;

const DataWindowCon = styled(motion.div)`
  display: flex;
  flex-direction: row;
`;

export const Overview = ({
  title,
  subTitles,
  data,
}: {
  title: string | undefined;
  subTitles: string[];
  data: Country | Global | undefined;
}) => {
  return (
    <Container>
      <h2>{title}</h2>
      <DataWindowCon>
        <DataSubWindow
          subTitle={subTitles[0]}
          total={data?.TotalConfirmed}
          increase={data?.NewConfirmed}
        />
        <DataSubWindow
          subTitle={subTitles[1]}
          total={data?.TotalDeaths}
          increase={data?.NewDeaths}
        />
        <DataSubWindow
          subTitle={subTitles[2]}
          total={data?.TotalRecovered}
          increase={data?.NewRecovered}
        />
      </DataWindowCon>
    </Container>
  );
};
