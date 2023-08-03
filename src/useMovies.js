import { useEffect, useState } from "react";

const KEY = "1fe12e90";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchData() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Something went wrong !");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found !");
          setMovies(data.Search);
          setError("");
        } catch (e) {
          if (e.name !== "AbortError") {
            setError(e.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query?.length < 3) {
        setError("");
        setMovies([]);
        return;
      }

      fetchData();
      //   handleCloseMovie();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { isLoading, movies, error };
}
