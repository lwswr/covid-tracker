import React from "react";
import { DataResponse } from "./API";
import produce from "immer";

export type State = {
  data: DataResponse | undefined;
  search: string;
};

export type Events =
  | {
      type: "data fetched";
      data: DataResponse;
    }
  | {
      type: "search set";
      search: string;
    };

export const initialState = (): State => ({
  data: {
    Global: {
      NewConfirmed: 0,
      TotalConfirmed: 0,
      NewDeaths: 0,
      TotalDeaths: 0,
      NewRecovered: 0,
      TotalRecovered: 0,
    },
    Countries: [],
  },
  search: "United Kingdom",
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
