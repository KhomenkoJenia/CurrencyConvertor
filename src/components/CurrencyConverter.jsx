import React, { useState, useEffect } from "react";
import CastomInput from "./CastomInput";

const CurrencyConverter = () => {
  const [exchangeRates, setExchangeRates] = useState({
    UAH: 0,
    USD: 0,
    EUR: 0,
  });

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("EUR");

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://openexchangerates.org/api/latest.json?app_id=187bbe78037e46bd860df9bfe1c9ad57"
        );
        const data = await response.json();
        setExchangeRates({
          UAH: data.rates.UAH,
          USD: data.rates.USD,
          EUR: data.rates.EUR,
        });
      } catch (error) {
        console.error("Помилка при отриманні курсів валют:", error);
      }
    };

    fetchExchangeRates();
  }, []);
  console.log(exchangeRates);

  const convertCurrency = (value, from, to) => {
    const convertedValue = (value / exchangeRates[from]) * exchangeRates[to];
    return isNaN(convertedValue) ? 0 : convertedValue;
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleCurrencyChange = (value, isFromCurrency) => {
    if (isFromCurrency) {
      setFromCurrency(value);
    } else {
      setToCurrency(value);
    }
  };

  const convertedValue = convertCurrency(amount, fromCurrency, toCurrency);

  return (
    <div>
      <div>
        {Object.entries(exchangeRates).map(([currency, rate]) => (
          <p key={currency}>{`${currency} : ${rate}`}</p>
        ))}
      </div>
      <CastomInput
        label="Від якої валюти"
        value={amount}
        currency={fromCurrency}
        onValueChange={handleAmountChange}
        onCurrencyChange={(value) => handleCurrencyChange(value, true)}
      />
      <CastomInput
        label="По відношенню до якої валюти"
        value={convertedValue}
        currency={toCurrency}
        onValueChange={() => {}}
        onCurrencyChange={(value) => handleCurrencyChange(value, false)}
        disabled={true}
      />
    </div>
  );
};

export default CurrencyConverter;
