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
      } catch (error) {
        console.log(error);
      }
    }
    getCovidData();
  }, []);

  useEffect(() => {
    const findCountry = (countries: Country[], search: string) => {
      return countries.find((country) => country.Country === search);
    };
    const newCountry = findCountry(state.data.Countries, state.search);
    update({ type: "country set", selectedCountry: newCountry });
  }, [state.data.Countries, state.search]);

  if (!state.data) return null;

  console.log(state.selectedCountry);

  return (
    <div className="App">
      <SearchForm
        submit={(search) => {
          void update({ type: "search set", search: search });
          console.log(state.search);
        }}
      />
      {state.data.Global ? <GlobalWindow global={state.data.Global} /> : null}
      {state.selectedCountry ? (
        <CountryWindow country={state.selectedCountry} />
      ) : null}
    </div>
  );
}

export default App;
