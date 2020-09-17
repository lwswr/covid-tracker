import React from "react";
import { initialState, reducer } from "./state";
import { useEffect } from "react";
import { getData, DataResponse, Country } from "./API";
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

  useEffect(() => {
    const newCountry: Country | undefined = state.data.countries.find(
      (country) => country.Country === state.search
    );
    update({ type: "country set", selectedCountry: newCountry });
    console.log(newCountry);
  }, [state.data.countries, state.search]);

  if (!state.data) return null;

  return (
    <div className="App">
      <SearchForm
        submit={(search) => {
          void update({ type: "search set", search: search });
        }}
      />
      {state.data.global ? <GlobalWindow global={state.data.global} /> : null}
      {state.selectedCountry ? (
        <CountryWindow country={state.selectedCountry} />
      ) : null}
      {console.log(state.selectedCountry)}
    </div>
  );
}

export default App;
