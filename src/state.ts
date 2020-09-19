import React from "react";
import { DataResponse, Country, Global } from "./API";
import produce from "immer";

export type State = {
  countries: Country[]
  global: undefined | Global;
  search: string;
  selectedCountry: Country | undefined;
};

export type Events =
  | {
      type: "data fetched";
      data: DataResponse;
    }
  | {
      type: "search updated";
      search: string;
    }

export const initialState = (): State => ({
  countries: [],
  global: undefined,
  search: "",
  selectedCountry: undefined,
});

export const reducer: React.Reducer<State, Events> = (state, event) =>
  produce(state, (draft) => {
    switch (event.type) {
      case "data fetched": {
        draft.countries = event.data.Countries
        draft.global = event.data.Global
        break;
      }
      case "search updated": {
        draft.search = event.search;
        const matchedCountry = draft.countries.find(country => country.Country.toLowerCase() === event.search.toLowerCase())
        if(matchedCountry) {
          draft.selectedCountry = matchedCountry
        }
      }
    }
  });
