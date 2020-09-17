import React from "react";
import { DataResponse, Country } from "./API";
import produce from "immer";

export type State = {
  data: DataResponse;
  search: string;
  selectedCountry: Country | undefined;
};

export type Events =
  | {
      type: "data fetched";
      data: DataResponse;
    }
  | {
      type: "search set";
      search: string;
    }
  | {
      type: "country set";
      selectedCountry: Country | undefined;
    };

export const initialState = (): State => ({
  data: {
    Global: undefined,
    Countries: [],
  },
  search: "United Kingdom",
  selectedCountry: undefined,
});

export const reducer: React.Reducer<State, Events> = (state, event) =>
  produce(state, (draft) => {
    switch (event?.type) {
      case "data fetched": {
        draft.data = event.data;
        break;
      }
      case "search set": {
        draft.search = event.search;
      }
    }
  });
