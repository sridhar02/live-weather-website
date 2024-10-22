"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useDebounce } from "./hooks/useDebounce";

import styles from "./page.module.css";
import { formatErrorMessage } from "./utils";

export default function Home() {
  const [error, setError] = useState();
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
    if (debouncedSearchText.length !== 0) {
      fetchWeatherData(debouncedSearchText);
    } else {
      setResponse(null);
      setError(null);
    }
  }, [debouncedSearchText]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}> Live Weather App</h1>
      <input
        className={styles.searchBox}
        type="text"
        placeholder="Enter city name, like hyderabad or london"
        value={searchText}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {response && (
        <div>
          <p className={styles.displayValue}>
            Temperature:{" "}
            <span className={styles.value}>{response?.main?.temp} °F</span>
          </p>
          <p className={styles.displayValue}>
            Humidity:
            <span className={styles.humidity}>
              {response?.main?.humidity} %
            </span>
          </p>
          <p className={styles?.displayValue}>
            Weather
            <span className={styles.weather}>
              {response?.weather[0]?.description}
            </span>
          </p>
        </div>
      )}

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}
