import { useEffect, useState } from "react";

export function useCurrencyConverter(): number {
  const [exchangeRate, setExchangeRate] = useState<number>(15800);
  const CACHE_DURATION = 60 * 60 * 1000;

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const now = Date.now();
      const cachedRate = sessionStorage.getItem("exchangeRate");
      const cachedTime = sessionStorage.getItem("exchangeRateTime");

      if (cachedRate && cachedTime) {
        const timeDiff = now - Number.parseInt(cachedTime);
        if (timeDiff < CACHE_DURATION) {
          setExchangeRate(Number.parseFloat(cachedRate));
          return;
        }
      }

      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD",
        );
        const data = await response.json();
        const rate = data.rates.IDR;
        setExchangeRate(rate);
        sessionStorage.setItem("exchangeRate", rate.toString());
        sessionStorage.setItem("exchangeRateTime", now.toString());
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, []);

  return exchangeRate;
}