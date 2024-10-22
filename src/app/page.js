"use client";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [error, setError] = useState();
  const [response, setResponse] = useState();
  const [searchText, setSearchText] = useState("");
  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
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
    setSearchText(text);
  };

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
    </div>
  );
}
