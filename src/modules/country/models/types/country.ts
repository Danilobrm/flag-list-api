export type Country = {
  name: string;
  countryCode: string;
};

export type CountryBorders = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryBorders[] | null;
};

export type CountryPopulation = {
  country: string;
  code: string;
  populationCounts: PopulationCount[];
};

export type PopulationCount = {
  year: number;
  value: number;
};

export type CountryInfo = {
  population: CountryPopulation | null;
  borders: CountryBorders[] | null;
};

export type CountryDetails = {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
};

export type Holiday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
};
