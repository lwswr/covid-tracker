import React from "react";
import { initialState, reducer } from "./state";
import { useEffect } from "react";
import { getData, DataResponse, Country } from "./API";
import { SearchForm } from "./SearchForm";
import { DataWindow } from "./DataWindow";
import styled from "styled-components";
import { Selector } from "./Selector";
import { List } from "./List";
// import { MostNewConfirmed } from "./MostNewConfirmed";
// import { MostNewDeaths } from "./MostNewDeaths";

const AllData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

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

  const sortCountries = (
    countries: Country[],
    key: "TotalDeaths" | "TotalConfirmed" | "TotalRecovered"
  ) => {
    return countries
      .slice(0)
      .sort((a, b) => {
        return b[key] - a[key];
      })
      .slice(0, 5);
  };

  const getList = (selectedList: string) => {
    if (selectedList === "Cases") {
      return "TotalConfirmed";
    } else if (selectedList === "Deaths") {
      return "TotalDeaths";
    }
    return "TotalRecovered";
  };

  if (!state.global || !state.countries || !state.selectedList)
    return <div>loading...</div>;

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
        <Selector
          onChange={(list: string) => {
            void update({ type: "selected list changed", selectedList: list });
          }}
          selectedList={["Cases", "Deaths", "Recovered"]}
          value={state.selectedList}
        />
        <List
          list={sortCountries(state.countries, getList(state.selectedList))}
          key={getList(state.selectedList)}
        />
      </AllData>
    </div>
  );
}

export default App;
