import React, { useEffect } from "react";
import styled from "styled-components";
import { initialState, reducer } from "./state";
import {
  getData,
  DataResponse,
  Country,
  CountryStatusResponse,
  getStatusData,
} from "./API";
import { SearchForm } from "./SearchForm";
import { DataWindow } from "./DataWindow";
import { Selector } from "./Selector";
import { List } from "./List";

const AllData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding-top: 20px;
`;

const CasesOverview = styled.div`
  border: 1px solid grey;
  border-radius: 15px;
`;

const Title = styled.div`
  font-size: 25px;
  margin: 5px;
`;

function App() {
  const [state, update] = React.useReducer(reducer, initialState());

  // getCovidData runs once upon mounting
  useEffect(() => {
    async function getCovidData() {
      try {
        const covidResponse: DataResponse = await getData();
        update({ type: "data fetched", data: covidResponse });
        update({ type: "search updated", search: "united kingdom" });
      } catch (error) {
        console.log(error);
      }
    }
    getCovidData();
  }, []);

  // getCountryStatusData runs when state.search is updated
  useEffect(() => {
    async function getCountryStatusData(country: string | undefined) {
      try {
        const countryStatusResponse: CountryStatusResponse = await getStatusData(
          country
        );
        update({ type: "country status fetched", data: countryStatusResponse });
      } catch (error) {
        console.log(error);
      }
    }
    if (state.search) getCountryStatusData(state.search);
  }, [state.search]);

  // Takes sorting parameter as string allowing for one function to sort all
  const sortCountries = (
    countries: Country[],
    key: "TotalDeaths" | "TotalConfirmed" | "TotalRecovered"
  ) => {
    return countries
      .slice(0)
      .sort((a, b) => {
        return b[key] - a[key];
      })
      .slice(0, 10);
  };

  // Two functions doing the same thing, could returned values be passed in as a string?
  // Also probably a much cleaner way to consdense these.

  const getDisplayKey = (selectedList: string) => {
    if (selectedList === "Cases") {
      return "TotalConfirmed";
    } else if (selectedList === "Deaths") {
      return "TotalDeaths";
    }
    return "TotalRecovered";
  };

  const getSecondaryDisplayKey = (selectedList: string) => {
    if (selectedList === "Cases") {
      return "NewConfirmed";
    } else if (selectedList === "Deaths") {
      return "NewDeaths";
    }
    return "NewRecovered";
  };

  if (
    !state.global ||
    !state.countries ||
    !state.selectedList ||
    !state.countryStatus
  )
    return <div>loading...</div>;

  console.log(state.countryStatus);

  return (
    <div className="App">
      <AllData>
        <SearchForm
          submit={(search) =>
            void update({ type: "search updated", search: search })
          }
        />
        <CasesOverview>
          <Title>Cases Overview</Title>

          {state.global ? (
            <DataWindow title={"Global"} data={state.global} />
          ) : null}
          {state.selectedCountry ? (
            <DataWindow
              title={state.selectedCountry?.Country}
              data={state.selectedCountry}
            />
          ) : null}
        </CasesOverview>
        <Selector
          onChange={(list: string) => {
            void update({ type: "selected list changed", selectedList: list });
          }}
          selectedList={["Cases", "Deaths", "Recovered"]}
          value={state.selectedList}
        />
        <List
          list={sortCountries(
            state.countries,
            getDisplayKey(state.selectedList)
          )}
          selectedList={state.selectedList}
          displayKey={getDisplayKey(state.selectedList)}
          secondaryDisplayKey={getSecondaryDisplayKey(state.selectedList)}
        />
      </AllData>
    </div>
  );
}

export default App;
