import React, { useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import styles from "./styles.module.css";

function MusicSuggestor() {
  const [songTitle, setSongTitle] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [playlistLength, setCount] = useState();

  async function getSuggestions(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (suggestions.length > 0) {
      setSuggestions([]);
    }
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://b8t1bievja.execute-api.us-east-1.amazonaws.com/song",
        {
          // const response = await axios.post("http://localhost:4000/song", {
          titles: songTitle,
          length: playlistLength,
        }
      );
      if (response.data.suggestions) {
        const suggestionsArray = response.data.suggestions
          .split("\n")
          .filter((suggestion: string) => suggestion.length > 0);
        setSuggestions(suggestionsArray);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error(error);
    }

    setIsLoading(false);
  }

  return (
    <main className={styles.main}>
      <div>
        <h1>Music Recommendation Engine</h1>
        <p>
          Enter one or more song titles and/or artists and a suggestion
          playlistLength to generate a playlist ordered by relative similarity.
          You may enter multiple titles and/or artists. Once you've generated a
          playlist, you can click "Refine" to further refine your playlist.
        </p>
        <form
          className="flex flex-column gap-3 py-4"
          onSubmit={(e) => getSuggestions(e)}
        >
          <div className="flex flex-row gap-2">
            <span className="p-float-label">
              <InputNumber
                inputId="playlistLength"
                className="p-inputtext-lg"
                aria-label="Playlist length"
                value={playlistLength}
                showButtons
                onValueChange={(e) => setCount(e.value)}
                disabled={isLoading}
                min={1}
                max={100}
                suffix=" songs"
                required
              />
              <label htmlFor="playlistLength">Playlist length</label>
            </span>
            <span className="p-input-icon-left w-full p-float-label">
              <i className="pi pi-search" />
              <InputText
                id="songTitle"
                className="p-inputtext-lg w-full"
                aria-label="Song titles"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                disabled={isLoading}
                required
              />
              <label htmlFor="songTitle">Song titles</label>
            </span>
          </div>
          <Button
            className="p-button-lg inline-block"
            type="submit"
            disabled={isLoading}
          >
            Submit
          </Button>
        </form>
      </div>
      <Divider />
      <div className={styles.suggestionsContainer}>
        {isLoading && (
          <i className="pi pi-spin pi-cog" style={{ fontSize: "3rem" }}></i>
        )}
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
