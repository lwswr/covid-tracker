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
    async function setNewCountry(newSearch: string) {
      const newCountry: Country | undefined = state.data.Countries.find(
        (country) => country.Country === newSearch
      );
      update({ type: "country set", selectedCountry: newCountry });
      console.log(newCountry);
    }
    setNewCountry(state.search);
  }, [state.data.Countries, state.search]);

  if (!state.data) return null;

  return (
    <div className="App">
      <SearchForm
        submit={(search) => {
          void update({ type: "search set", search: search });
        }}
      />
      {state.data.Global ? <GlobalWindow global={state.data.Global} /> : null}
      {state.selectedCountry ? (
        <CountryWindow country={state.selectedCountry} />
      ) : null}
      {console.log(state.selectedCountry)}
    </div>
  );
}

export default App;
