import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";
import styles from "./styles.module.css";
import { Knob } from "primereact/knob";
import { PendingElement } from '../../components';
import {
  useSongSuggestionsMutation,
  TSongSuggestionsRequest,
  TSong,
  getSpotifyTrack
} from "../../data-provider";

function MusicSuggestor() {
  const [songTitles, setSongTitles] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [temperature, setTemperature] = useState(5);
  const [enableRefine, setEnableRefine] = useState(false);

  const songSuggestionsMutation = useSongSuggestionsMutation();

  function getSuggestions(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (suggestions.length > 0) {
      setSuggestions([]);
    }
    const requestData: TSongSuggestionsRequest = {
      titles: songTitles,
      length: 10,
      temperature: temperature * 0.1,
    };
    songSuggestionsMutation.mutate(requestData);
  }

  const onLoadTrack = ({ artist, title }: TSong) => {
    const queryParams = encodeURI(`track:${title} artist:${artist}`);
    const respose = getSpotifyTrack(queryParams);
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
          while lower values like 2 will make it more focused and deterministic.
        </p>
        <form
          className="flex flex-column gap-3 py-4"
          onSubmit={(e) => getSuggestions(e)}
        >
          <div className="flex flex-row gap-3">
            <span className="p-input-icon-left w-full p-float-label">
              <i className="pi pi-search" />
              <InputTextarea
                id="songTitles"
                rows={3}
                className="p-inputtext-lg w-full"
                aria-label="Song titles"
                value={songTitles}
                onChange={(e) => setSongTitles(e.target.value)}
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
            loading={songSuggestionsMutation.isLoading}
            className="p-button-lg inline-block"
            type="submit"
            disabled={songSuggestionsMutation.isLoading}
            label="Get Suggestions"
            aria-label="Get Suggestions"
          />
        </form>
      </div>
      <Divider />
      <div className={styles.suggestionsContainer}>
        {songSuggestionsMutation.isLoading && (
          <PendingElement />
        )}
        {songSuggestionsMutation.isError && (
          <p>Something went wrong. Please try again.</p>
        )}
        {songSuggestionsMutation.isSuccess &&
         JSON.parse(songSuggestionsMutation.data.suggestions).map((suggestion) => {
            return (
              <div className="flex flex-row gap-3 m-1" key={suggestions.indexOf(suggestion)}>
                <span>{suggestion.title} - {suggestion.artist}</span>
                <Button icon="pi pi-plus" onClick={(e) => onLoadTrack(suggestion.title, suggestion.artist)} />
                {/* <Checkbox value={suggestion} onChange={(e) => setSongTitles(`${songTitles}, ${suggestion}`)} /> */}
              </div>
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
