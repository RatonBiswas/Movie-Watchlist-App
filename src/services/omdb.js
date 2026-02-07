const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

function ensureKey() {
  if (!API_KEY) {
    return {
      ok: false,
      error: "Missing OMDb API key. Add VITE_OMDB_API_KEY to your environment."
    };
  }
  return { ok: true };
}

function mapMovieSummary(item) {
  return {
    id: item.imdbID,
    title: item.Title,
    year: item.Year,
    poster: item.Poster !== "N/A" ? item.Poster : null
  };
}

function mapMovieDetails(item) {
  return {
    id: item.imdbID,
    title: item.Title,
    year: item.Year,
    poster: item.Poster !== "N/A" ? item.Poster : null,
    plot: item.Plot,
    genres: item.Genre?.split(",").map((g) => g.trim()) ?? [],
    released: item.Released,
    rating: item.imdbRating
  };
}

export async function searchMovies(query) {
  const keyCheck = ensureKey();
  if (!keyCheck.ok) return { ok: false, error: keyCheck.error };
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.Response === "False") {
    return { ok: false, error: data.Error || "No results." };
  }
  return { ok: true, data: data.Search.map(mapMovieSummary) };
}

export async function getMovieDetails(id) {
  const keyCheck = ensureKey();
  if (!keyCheck.ok) return { ok: false, error: keyCheck.error };
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(id)}&plot=full`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.Response === "False") {
    return { ok: false, error: data.Error || "Movie not found." };
  }
  return { ok: true, data: mapMovieDetails(data) };
}
