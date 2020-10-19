import React from "react";
import { DataResponse, Country, Global } from "./API";
import produce from "immer";

export const options = ["Cases", "Deaths", "Recoveries"] as const;
export type OptionsType = typeof options[number];

export type State = {
  countries: Country[];
  global: undefined | Global;
  search: string;
  selectedCountry: Country | undefined;
  options: OptionsType;
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
  | {
      type: "options list changed";
      options: OptionsType;
    };

export const initialState = (): State => ({
  countries: [],
  global: undefined,
  search: "united kingdom",
  selectedCountry: undefined,
  options: "Cases",
});

export const reducer: React.Reducer<State, Events> = (state, event) =>
  produce(state, (draft) => {
    switch (event.type) {
      case "data fetched": {
        draft.countries = event.data.Countries;
        draft.global = event.data.Global;
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
      case "options list changed": {
        draft.options = event.options;
        break;
      }
    }
  });
