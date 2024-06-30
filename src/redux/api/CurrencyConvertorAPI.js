import axios from "axios";
import { baseURL } from "../../config/config";
import { setCurrency } from "../slices/CurrencySlice";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../..";

export const currencyConvertor = async (fromCurrency, toCurrency) => {
  try {
    const response = await axios.get(`${baseURL}meta/currencies/rate/list/`);
    const rates = response.data.data.conversion_rates;
    if (rates[fromCurrency]) {
      const fromRate = rates[fromCurrency];
      const torate = rates[toCurrency];
      const convertedamount = parseFloat(torate / fromRate);
      return convertedamount;
    } else {
      throw new Error("Currency not found in exchange rates data");
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const CurrencySet =() => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`${baseURL}user/currency/`);
    const currencyList = response.data.data.currency;
    if (currencyList && currencyList.length > 0) {
      const matchedCurrency = currencyList.find((bt) => bt.default === true);
      if (matchedCurrency) {
        const currencyData = {
          currencyCode: matchedCurrency?.code,
          symbol: matchedCurrency?.symbol,
        };
        await dispatch(setCurrency(currencyData));
      } else {
        const currencyData = {
          currencyCode: "SEK",
          symbol: "SEK",
        };
        await dispatch(setCurrency(currencyData));
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};
