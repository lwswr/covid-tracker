import React from "react";
import { initialState, reducer } from "./state";
import { useEffect } from "react";
import { getData, DataResponse } from "./API";
import { SearchForm } from "./SearchForm";
import { DataWindow } from "./DataWindow";
import styled from "styled-components";
import { MostNewCases } from "./MostNewCases";
import { MostNewDeaths } from "./MostNewDeaths";

const AllData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

function App() {
  const [state, update] = React.useReducer(reducer, initialState());

  useEffect(() => console.log(state), [state]);

  useEffect(() => {
    async function getCovidData() {
      try {
        const covidResponse: DataResponse = await getData();
        update({ type: "data fetched", data: covidResponse });
      } catch (error) {
        console.log(error);
      }
    }
    getCovidData();
  }, []);

  const highestCountriesByNewCases = React.useMemo(() => {
    return state.countries
      ? state.countries.slice(0).sort((a, b) => {
          return b.NewConfirmed - a.NewConfirmed;
        })
      : [];
  }, [state.countries]);

  const highestCountriesByNewDeaths = React.useMemo(() => {
    return state.countries
      ? state.countries.slice(0).sort((a, b) => {
          return b.NewDeaths - a.NewDeaths;
        })
      : [];
  }, [state.countries]);

  const highestCountriesByNewRecoveries = React.useMemo(() => {
    return state.countries
      ? state.countries.slice(0).sort((a, b) => {
          return b.NewDeaths - a.NewRecovered;
        })
      : [];
  }, [state.countries]);

  const highestCountriesByTotalCases = React.useMemo(() => {
    return state.countries
      ? state.countries.slice(0).sort((a, b) => {
          return b.TotalConfirmed - a.TotalConfirmed;
        })
      : [];
  }, [state.countries]);

  const highestCountriesByTotalDeaths = React.useMemo(() => {
    return state.countries
      ? state.countries.slice(0).sort((a, b) => {
          return b.TotalDeaths - a.TotalDeaths;
        })
      : [];
  }, [state.countries]);

  const highestCountriesByTotalRecoveries = React.useMemo(() => {
    return state.countries
      ? state.countries.slice(0).sort((a, b) => {
          return b.TotalRecovered - a.TotalRecovered;
        })
      : [];
  }, [state.countries]);

  if (!state.global || !state.countries) return <div>loading...</div>;

  return (
    <div className="App">
      <SearchForm
        submit={(search) =>
          void update({ type: "search updated", search: search })
        }
      />
      <AllData>
        {state.global ? (
          <DataWindow title={"Global"} data={state.global} />
        ) : null}
        {state.selectedCountry ? (
          <DataWindow
            title={state.selectedCountry?.Country}
            data={state.selectedCountry}
          />
        ) : null}
        <MostNewCases countries={highestCountriesByNewCases} />
        <MostNewDeaths countries={highestCountriesByNewDeaths} />
      </AllData>
    </div>
  );
}

export default App;
