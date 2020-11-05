import React from "react";
import {
  DataResponse,
  Country,
  Global,
  CountryStatus,
  CountryStatusResponse,
} from "./API";
import produce from "immer";

export const listOptions = ["Deaths", "Cases", "Recovered"] as const;
export type ListOption = typeof listOptions[number];

export type State = {
  countries: Country[];
  global: undefined | Global;
  search: string;
  selectedCountry: Country | undefined;
  selectedList?: ListOption;
  countryStatus: undefined | CountryStatus[];
};

export type Events =
  | {
      type: "data fetched";
      data: DataResponse;
    }
  | {
      type: "country status fetched";
      data: CountryStatusResponse;
    }
  | {
      type: "search updated";
      search: string;
    }
  | {
      type: "selected list changed";
      selectedList: ListOption;
    };

export const initialState = (): State => ({
  countries: [],
  global: undefined,
  search: "united kingdom",
  selectedCountry: undefined,
  selectedList: "Cases",
  countryStatus: undefined,
});

export const reducer: React.Reducer<State, Events> = (state, event) =>
  produce(state, (draft) => {
    switch (event.type) {
      case "data fetched": {
        draft.countries = event.data.Countries;
        draft.global = event.data.Global;
        break;
      }
      case "country status fetched": {
        draft.countryStatus = event.data;
        break;
      }
      case "search updated": {
        draft.search = event.search;
        const matchedCountry = draft.countries.find(
          (country) =>
            country.Country.toLowerCase() === event.search.toLowerCase()
        );
        if (matchedCountry) {
          draft.selectedCountry = matchedCountry;
        }
        break;
      }
      case "selected list changed": {
        draft.selectedList = event.selectedList;
        break;
      }
    }
  });
