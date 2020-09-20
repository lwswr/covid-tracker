import React from "react";
import { initialState, reducer } from "./state";
import { useEffect } from "react";
import { getData, DataResponse, Country } from "./API";
import { SearchForm } from "./SearchForm";
import { GlobalWindow } from "./GlobalWindow";
import { CountryWindow } from "./CountryWindow";

function App() {
  const [state, update] = React.useReducer(reducer, initialState());

  useEffect(() => console.log(state), [state])

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


  if (!state.global) return <div>loading...</div>

  return (
    <div className="App">
      <SearchForm
        submit={(search) => 
          void update({ type: "search updated", search: search })
        }
      />
      {state.selectedCountry ? <GlobalWindow global={state.selectedCountry} /> : null}
      {state.selectedCountry ? (
        <CountryWindow country={state.selectedCountry} />
      ) : null}
    </div>
  );
}

export default App;
