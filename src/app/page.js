"use client";

import styles from "./styles/page.module.css";
import { WeatherProvider } from "./Context/WeatherContext";
import { Weather } from "./components/Weather";

export default function Home() {
  return (
    <WeatherProvider>
      <div className={styles.container}>
        <h1 className={styles.heading}> Live Weather App</h1>
        <Weather />
      </div>
    </WeatherProvider>
  );
}
