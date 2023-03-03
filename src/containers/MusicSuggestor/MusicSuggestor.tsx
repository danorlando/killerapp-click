import React, { useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { Checkbox } from 'primereact/checkbox';
import styles from "./styles.module.css";

function MusicSuggestor() {
  const [songTitles, setSongTitles] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [playlistLength, setCount] = useState();
  const [enableRefine, setEnableRefine] = useState(false);

  async function getSuggestions(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (suggestions.length > 0) {
      setSuggestions([]);
    }
    setIsError(false);
    setIsLoading(true);
    try {
       const response = await axios.post("https://b8t1bievja.execute-api.us-east-1.amazonaws.com/song", {
      // const response = await axios.post("http://localhost:4000/song", {
        titles: songTitles,
        length: playlistLength,
      });
      if (response.data.suggestions) {
        const suggestionsArray = JSON.parse(response.data.suggestions);
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
                id="songTitles"
                className="p-inputtext-lg w-full"
                aria-label="Song titles"
                value={songTitles}
                onChange={(e) => setSongTitles(e.target.value)}
                disabled={isLoading}
                required
              />
              <label htmlFor="songTitles">Song titles</label>
            </span>
          </div>
          <Button
            loading={isLoading}
            className="p-button-lg inline-block"
            type="submit"
            disabled={isLoading}
            label="Get Suggestions"
            aria-label="Get Suggestions"
          />
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
               {console.log(suggestion)}
               {suggestion.title} - {suggestion.artist}
                {/* <Checkbox value={suggestion} onChange={(e) => setSongTitles(`${songTitles}, ${suggestion}`)} /> */}
              </span>
            );
          })}
        <Divider />
        {suggestions.length > 0 && (
          <Button
            className="p-button-lg inline-block"
            icon="pi pi-check"
            label="Refine"
            onClick={(e) => setEnableRefine(true)}
          />
        )}
      </div>
    </main>
  );
}

export default MusicSuggestor;
