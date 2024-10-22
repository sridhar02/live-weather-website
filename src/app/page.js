"use client";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [searchText, setSearchText] = useState("");

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
