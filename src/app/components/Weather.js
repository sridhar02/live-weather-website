import React from "react";
import styles from "../styles/weather.module.css";

import { useWeather } from "../Context/WeatherContext";

export const Weather = () => {
  const { error, response, searchText, handleInputChange } = useWeather();

  return (
    <div className={styles.container}>
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
};
