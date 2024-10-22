"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { formatErrorMessage } from "../utils";

const WeatherContext = createContext(null);

export const WeatherProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [response, setResponse] = useState();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 1000);

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=imperial`
      );
      if (!response.ok) {
        switch (response.status) {
          case 401:
            throw new Error("Unauthorized: Invalid API key");
          case 404:
            throw new Error("City not found");
          default:
            throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const responseJSON = await response.json();
      setResponse(responseJSON);
      console.log(responseJSON);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setResponse(null);
      const message = formatErrorMessage(error.message);
      console.log(message);
      setError(message);
    }
  };

  const handleInputChange = (text) => {
    const newText = text.trim().toLowerCase();
    setSearchText(newText);
  };

  useEffect(() => {
    if (debouncedSearchText?.length !== 0) {
      fetchWeatherData(debouncedSearchText);
    } else {
      setResponse(null);
      setError(null);
    }
  }, [debouncedSearchText]);

  return (
    <WeatherContext.Provider
      value={{
        error,
        response,
        searchText,
        handleInputChange,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
