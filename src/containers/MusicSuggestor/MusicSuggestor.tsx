import React, { useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";
import styles from "./styles.module.css";
import { Slider } from "primereact/slider";
import { Knob } from "primereact/knob";

function MusicSuggestor() {
  const [songTitles, setSongTitles] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [playlistLength, setPlaylistLength] = useState(10);
  const [temperature, setTemperature] = useState(5);
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
        temperature: temperature * 0.1,
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
          Enter one or more song titles and/or artists to generate a playlist
          ordered by relative similarity. You may enter multiple titles and/or
          artists. Use the temperature control to adjust the level of
          creativity. Higher values like 8 will make the output more random,
          while lower values like 2 will make it more focused and
          deterministic. Once you've generated a playlist, you can click "Refine"
          to further refine your playlist.
        </p>
        <form
          className="flex flex-column gap-3 py-4"
          onSubmit={(e) => getSuggestions(e)}
        >
          <div className="flex flex-row gap-3">
            {/* <span className="p-float-label">
              <InputNumber
                inputId="playlistLength"
                className="p-inputtext-lg"
                aria-label="Playlist length"
                value={playlistLength}
                showButtons
                onValueChange={(e) => setPlaylistLength(e.value)}
                disabled={isLoading}
                min={1}
                max={10}
                suffix=" songs"
                required
              />
              <label htmlFor="playlistLength">Playlist length</label>
            </span> */}
            <span className="p-input-icon-left w-full p-float-label">
              <i className="pi pi-search" />
              <InputTextarea
                id="songTitles"
                rows={3}
                className="p-inputtext-lg w-full"
                aria-label="Song titles"
                value={songTitles}
                onChange={(e) => setSongTitles(e.target.value)}
                disabled={isLoading}
                required
              />
              <label htmlFor="songTitles">Song titles</label>
            </span>
            <Knob
              value={temperature}
              min={0}
              max={12}
              step={1}
              onChange={(e) => setTemperature(e.value)}
            />
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-column">
              {/* <InputText value={value} onChange={(e) => setValue(e.target.value)} />
              <Slider value={value} onChange={(e) => setValue(e.value)} /> */}
            </div>
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
                {suggestion.title} - {suggestion.artist}
                {/* <Checkbox value={suggestion} onChange={(e) => setSongTitles(`${songTitles}, ${suggestion}`)} /> */}
              </span>
            );
          })}
        <Divider />
        {/* {suggestions.length > 0 && (
          <Button
            className="p-button-lg inline-block"
            icon="pi pi-check"
            label="Refine"
            onClick={(e) => setEnableRefine(true)}
          />
        )} */}
      </div>
    </main>
  );
}

export default MusicSuggestor;
