import React, { useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import styles from "./styles.module.css";

function MusicSuggestor() {
  const [songTitle, setSongTitle] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function getSuggestions(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    if (suggestions.length > 0) {
      setSuggestions([]);
    }
    setIsLoading(true);
    try {
      const response = await axios.post("https://b8t1bievja.execute-api.us-east-1.amazonaws.com/song", {
        song: songTitle,
      });
      if (response.data.recommendedTitles) {
        const suggestionsArray = response.data.recommendedTitles
          .split("\n")
          .filter((recommendation: string) => recommendation.length > 0);
        setSuggestions(suggestionsArray);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error(error)
    }

    setIsLoading(false);
  }

  return (
    <main className={styles.main}>
      <div>
        <h1>Music Recommendation Engine</h1>
        <p>Enter a song title to get suggestions.</p>
        <form
          className="flex flex-column gap-3"
          onSubmit={(e) => getSuggestions(e)}
        >
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              className="p-inputtext-lg w-full"
              value={songTitle}
              placeholder="Search"
              onChange={(e) => setSongTitle(e.target.value)}
              disabled={isLoading}
              required
            />
          </span>
          <Button className="p-button-lg inline-block" type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </div>
      <div className={styles.suggestionsContainer}>
        {isLoading && <i className="pi pi-spin pi-cog" style={{ fontSize: '3rem' }}></i>}
        {isError && <p>Something went wrong. Please try again.</p>}
      {suggestions &&
        suggestions.map((suggestion) => {
          return (
            <span className="m-1" key={suggestions.indexOf(suggestion)}>
              {suggestion}
            </span>
          );
        })}
      </div>
    </main>
  );
}

export default MusicSuggestor;
