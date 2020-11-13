import React, { useEffect } from "react";
import styled from "styled-components";
import { initialState, listOptions, reducer } from "./state";
import {
  getSummaryData,
  SummaryResponse,
  Country,
  StatusResponse,
  getStatusData,
} from "./API";
import { SearchForm } from "./SearchForm";
import { Overview } from "./Overview";
import { Selector } from "./Selector";
import { List } from "./List";
import { unreachable } from "./tsHelpers";
import { motion, AnimatePresence } from "framer-motion";
import { Graph } from "./Graph";

const AllData = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding-top: 20px;
  width: 60%;
`;

const Title = styled(motion.div)`
  display: flex;
  border: 1px solid grey;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 10px;
  width: 70%;
  font-size: 35px;
  letter-spacing: 4px;
`;

const OverviewWindow = styled(motion.div)`
  border: 1px solid grey;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 5px;
  align-content: stretch;
  width: 70%;
`;

const OverviewTitle = styled(motion.div)`
  font-size: 25px;
  margin: 5px;
`;

const CasesOverviewTitleAndForm = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ListAndSelector = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  border: 1px solid grey;
  padding: 30px;
  margin: 5px 0px;
  border-radius: 15px;
`;

type DisplayKey = "TotalDeaths" | "TotalConfirmed" | "TotalRecovered";
type SecondaryDisplayKey = "NewDeaths" | "NewConfirmed" | "NewRecovered";

function App() {
  const [state, update] = React.useReducer(reducer, initialState());
  const subTitleOptions: string[] = ["Cases", "Deaths", "Recovered"];

  // getCovidData runs once upon mounting
  useEffect(() => {
    async function getSummary() {
      try {
        const summaryResponse: SummaryResponse = await getSummaryData();
        update({ type: "data fetched", data: summaryResponse });
        update({ type: "search updated", search: "India" });
      } catch (error) {
        console.log(error);
      }
    }
    getSummary();
  }, []);

  // getCountryStatusData runs when state.search is updated
  useEffect(() => {
    async function getStatus(country: string | undefined) {
      try {
        const statusResponse: StatusResponse = await getStatusData(country);
        update({ type: "country status fetched", data: statusResponse });
      } catch (error) {
        console.log(error);
      }
    }
    if (state.search) getStatus(state.search);
  }, [state.search]);

  // Takes sorting parameter as string allowing for one function to sort all
  const sortCountries = (countries: Country[], key: DisplayKey) => {
    return countries
      .slice(0)
      .sort((a, b) => {
        return b[key] - a[key];
      })
      .slice(0, 10);
  };

  //
  const [displayKey, secondaryDisplayKey] = React.useMemo(():
    | [DisplayKey, SecondaryDisplayKey]
    | [undefined, undefined] => {
    if (state.selectedList) {
      switch (state.selectedList) {
        case "Cases": {
          return ["TotalConfirmed", "NewConfirmed"];
        }
        case "Deaths": {
          return ["TotalDeaths", "NewDeaths"];
        }
        case "Recovered": {
          return ["TotalRecovered", "NewRecovered"];
        }
        default: {
          unreachable(state.selectedList);
        }
      }
    }
    return [undefined, undefined];
  }, [state.selectedList]);

  if (
    !state.global ||
    !state.countries ||
    !state.selectedList ||
    !state.countryStatus
  )
    return <div>loading...</div>;

  return (
    <div className="App">
      <AnimatePresence>
        <AllData>
          <Title
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, y: "-20px" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            COVID-19 TRACKER
          </Title>
          <OverviewWindow
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, x: "-100px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            <CasesOverviewTitleAndForm>
              <OverviewTitle>COVID-19 Overview</OverviewTitle>
              <SearchForm
                submit={(search) =>
                  void update({ type: "search updated", search: search })
                }
              />
            </CasesOverviewTitleAndForm>

            {state.global ? (
              <Overview
                title={"Global"}
                subTitles={subTitleOptions}
                data={state.global}
              />
            ) : null}
            {state.selectedCountry ? (
              <Overview
                title={state.selectedCountry?.Country}
                subTitles={subTitleOptions}
                data={state.selectedCountry}
              />
            ) : null}
          </OverviewWindow>

          <ListAndSelector
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, x: "100px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            <Selector
              onChange={(list) => {
                void update({
                  type: "selected list changed",
                  selectedList: list,
                });
              }}
              selectedList={listOptions}
              value={state.selectedList}
            />
            <List
              list={sortCountries(state.countries, displayKey!)}
              selectedList={state.selectedList}
              displayKey={displayKey!}
              secondaryDisplayKey={secondaryDisplayKey!}
            />
          </ListAndSelector>
          <Graph
            chartData={state.countryStatus}
            listChoice={state.selectedList}
          />
        </AllData>
      </AnimatePresence>
    </div>
  );
}

export default App;
