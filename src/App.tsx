import React from "react";
import { initialState, reducer } from "./state";
import { useEffect } from "react";
import { getData, DataResponse } from "./API";
import { SearchForm } from "./SearchForm";
import { DataWindow } from "./DataWindow";
import styled from "styled-components";

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

  if (!state.global) return <div>loading...</div>;

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
      </AllData>
    </div>
  );
}

export default App;
