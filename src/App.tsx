import React from "react";
import { initialState, reducer } from "./state";
import { useEffect } from "react";
import { getData, DataResponse, Country } from "./API";
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

  // function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  //   return propertyNames.map((n) => o[n]);
  // }

  function sortArray<T, K extends keyof T>(array: T, key: K[]): T[K][] {
    return array.slice(0).sort((a, b) => {
      return b[key] - a[key];
    });
  }

  const sortedNewConfirmed: Country[] = sortArray(
    state.countries,
    "NewConfirmed"
  );
  console.log(sortedNewConfirmed);

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
