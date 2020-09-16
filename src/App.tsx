import React from "react";
import { initialState, reducer } from "./state";
import { useEffect } from "react";
import { getData, DataResponse } from "./API";
import { SearchForm } from "./SearchForm";
import { GlobalWindow } from "./GlobalWindow";
import { CountryWindow } from "./CountryWindow";

function App() {
  const [state, update] = React.useReducer(reducer, initialState());

  useEffect(() => {
    async function getCovidData() {
      try {
        const covidResponse: DataResponse = await getData();
        update({ type: "data fetched", data: covidResponse });
        console.log(covidResponse);
      } catch (error) {
        console.log(error);
      }
    }
    getCovidData();
  }, []);

  if (!state.data) return null;

  const selectedCountry = state.data.Countries.find(
    (country) => country.Country === state.search
  );

  return (
    <div className="App">
      <SearchForm
        submit={(search) => {
          void update({ type: "search set", search: search });
        }}
      />
      <GlobalWindow global={state.data.Global} />
      <CountryWindow country={selectedCountry} />
    </div>
  );
}

export default App;
