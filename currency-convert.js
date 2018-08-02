//USD, CAD, 20
//20 USD is Worth 26 CAD. You can spend these in the following countries: Canada

const axios = require("axios");

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(
      "http://data.fixer.io/api/latest?access_key=48e6c4ff5a3023fd4fd67bb10e247e99"
    );
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if (isNaN(rate)) throw new Error();
    return rate;
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
  }
};

const getCountries = async country => {
  try {
    const response = await axios.get(
      `https://restcountries.eu/rest/v2/currency/${country}`
    );
    return response.data.map(country => country.name);
  } catch (e) {
    throw new Error(`Unable to get list of countries`);
  }
};

const currencyConversion = async (from, to, amount) => {
  const conversion = await getExchangeRate(from, to);
  const newAmount = (conversion * amount).toFixed(2);
  const countries = await getCountries(to);
  return `${amount} ${from} is worth ${newAmount} ${to}. You can spend ${to} in the following countries: ${countries}`;
};

currencyConversion("USD", "CAD", 20)
  .then(response => console.log(response))
  .catch(e => {
    console.log(e.message);
  });
