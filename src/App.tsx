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
import { DataWindow } from "./DataWindow";
import { Selector } from "./Selector";
import { List } from "./List";
import { unreachable } from "./tsHelpers";
import { motion, AnimatePresence } from "framer-motion";

const AllData = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding-top: 20px;
  width: 60%;
`;

const CasesOverview = styled(motion.div)`
  border: 1px solid grey;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 10px;
  align-content: stretch;
  width: 70%;
`;

const Title = styled(motion.div)`
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
  margin: 10px 0px;
  border-radius: 15px;
`;

type DisplayKey = "TotalDeaths" | "TotalConfirmed" | "TotalRecovered";
type SecondaryDisplayKey = "NewDeaths" | "NewConfirmed" | "NewRecovered";

function App() {
  const [state, update] = React.useReducer(reducer, initialState());

  // getCovidData runs once upon mounting
  useEffect(() => {
    async function getSummary() {
      try {
        const summaryResponse: SummaryResponse = await getSummaryData();
        update({ type: "data fetched", data: summaryResponse });
        update({ type: "search updated", search: "United Kingdom" });
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
        <AllData
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CasesOverview
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, x: "-100px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            <CasesOverviewTitleAndForm>
              <Title>Cases Overview</Title>
              <SearchForm
                submit={(search) =>
                  void update({ type: "search updated", search: search })
                }
              />
            </CasesOverviewTitleAndForm>

            {state.global ? (
              <DataWindow title={"Global"} data={state.global} />
            ) : null}
            {state.selectedCountry ? (
              <DataWindow
                title={state.selectedCountry?.Country}
                data={state.selectedCountry}
              />
            ) : null}
          </CasesOverview>

          <ListAndSelector
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, x: "100px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, ease: "easeOut", duration: 2 }}
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
        </AllData>
      </AnimatePresence>
    </div>
  );
}

export default App;
