import axios from "axios";

export type DataResponse = {
  Global: Global | undefined;
  Countries: Country[];
};

export type Global = {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
};

export type Country = {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: string;
};

export const getData = async () => {
  const response = await axios.get<DataResponse>(
    `https://api.covid19api.com/summary`
  );
  return response.data;
};
