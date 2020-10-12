import React from "react";
import { initialState, reducer } from "./state";
import { useEffect } from "react";
import { getData, DataResponse, Country } from "./API";
import { SearchForm } from "./SearchForm";
import { DataWindow } from "./DataWindow";
import styled from "styled-components";
import { MostNewConfirmed } from "./MostNewConfirmed";
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

  const sortCountries = (
    countries: Country[],
    key:
      | "NewConfirmed"
      | "NewDeaths"
      | "NewRecovered"
      | "TotalDeaths"
      | "TotalConfirmed"
      | "TotalRecovered"
  ) => {
    return countries
      .slice(0)
      .sort((a, b) => {
        return b[key] - a[key];
      })
      .slice(0, 5);
  };

  const highestCountriesByNewConfirmed = sortCountries(
    state.countries,
    "NewConfirmed"
  );

  const highestCountriesByNewDeaths = sortCountries(
    state.countries,
    "NewDeaths"
  );

  const highestCountriesByNewRecoveries = sortCountries(
    state.countries,
    "NewRecovered"
  );

  const highestCountriesByTotalConfirmed = sortCountries(
    state.countries,
    "TotalConfirmed"
  );

  const highestCountriesByTotalDeaths = sortCountries(
    state.countries,
    "TotalDeaths"
  );

  const highestCountriesByTotalRecoveries = sortCountries(
    state.countries,
    "TotalRecovered"
  );

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
        <MostNewConfirmed countries={highestCountriesByNewConfirmed} />
        <MostNewDeaths countries={highestCountriesByNewDeaths} />
      </AllData>
    </div>
  );
}

export default App;
