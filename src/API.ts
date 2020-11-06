import axios from "axios";

// Types from getSummaryData
export type SummaryResponse = {
  Global?: Global;
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

export type StatusResponse = Status[];

export type Status = {
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: string;
  Date: string;
};

export const getSummaryData = async () => {
  const response = await axios.get<SummaryResponse>(
    `https://api.covid19api.com/summary`
  );
  return response.data;
};

export const getStatusData = async (country: string | undefined) => {
  const response = await axios.get<StatusResponse>(
    `https://api.covid19api.com/total/dayone/country/${country}/status/confirmed`
  );
  return response.data;
};

// https://api.covid19api.com/country/south-africa/status/confirmed/live?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
