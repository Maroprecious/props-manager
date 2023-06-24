export const currencySymbol: any = {
  ngn: "₦",
  usd : "$",
  euro: "€"
}

const currencies = [
  {
    currencyName: "Nigerian Naira",
    currencyShort: "NGN",
    currencySymbol: "₦",
  },

  {
    currencyName: "United States Dollar",
    currencyShort: "USD",
    currencySymbol: "$",
  },

  {
    currencyName: "British Pound Sterling",
    currencyShort: "GBP",
    currencySymbol: "£",
  },

  {
    currencyName: "Euro",
    currencyShort: "EUR",
    currencySymbol: "€",
  },
];

export const currenciesShort = currencies.map((c) => c.currencyShort);
export default currencies;
