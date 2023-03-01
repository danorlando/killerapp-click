import React, { useState } from "react";
import axios from "axios";

function MusicSuggestor() {
  const [songTitle, setSongTitle] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  async function getRecommendations(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/song", {
        // .post("https://b8t1bievja.execute-api.us-east-1.amazonaws.com/song", {
        // .post("http://localhost:3000/song", {
        // .post("https://riqe2f33fi.execute-api.us-east-1.amazonaws.com/song", {
        song: songTitle,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.recommendedTitles) {
          const recommendationsArray =
            response.data.recommendedTitles.split("\n").filter((recommendation:string) => recommendation.length > 0);
          setRecommendations(recommendationsArray);
        } else {
          setRecommendations([
            "No recommendations found or an error occurred.",
          ]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="App">
      <div>
        <h1>Music Recommendation Engine</h1>
        <p>Enter a song title to get recommendations.</p>
        <form onSubmit={(e) => getRecommendations(e)}>
          <input
            type="text"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <hr />
      {recommendations &&
        recommendations.map((recommendation) => {
          return <p key={recommendations.indexOf(recommendation)}>{recommendation}</p>;
        })}
    </div>
  );
}

export default MusicSuggestor;
