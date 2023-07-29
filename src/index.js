import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
function Test() {
  const [movieRate, setMovieRate] = useState(0);
  return (
    <div>
      <StarRating maxRating={10} color="pink" onSetRating={setMovieRate} />
      <p>The Movie Rated {movieRate} </p>
    </div>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
