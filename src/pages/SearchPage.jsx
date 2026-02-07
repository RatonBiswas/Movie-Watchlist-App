import { useState } from "react";
import { searchMovies } from "../services/omdb.js";
import { useWatchlist } from "../services/watchlist.jsx";
import { useAuth } from "../services/auth.jsx";
import MovieCard from "../components/MovieCard.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import { EmptyPanel, LoadingPanel } from "../components/StatusPanel.jsx";

export default function SearchPage() {
  const { add, remove, has, lastError } = useWatchlist();
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    setStatus("loading");
    setError("");
    const response = await searchMovies(query.trim());
    if (!response.ok) {
      setStatus("error");
      setError(response.error);
      setResults([]);
      return;
    }
    setResults(response.data);
    setStatus(response.data.length ? "success" : "empty");
  };

  const handleAdd = async (movie) => {
    const result = await add(movie);
    if (result?.ok === false) {
      setActionMessage(result.message);
    } else {
      setActionMessage("");
    }
  };

  const handleRemove = async (movie) => {
    const result = await remove(movie);
    if (result?.ok === false) {
      setActionMessage(result.message);
    } else {
      setActionMessage("");
    }
  };

  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-br from-brand-100 via-white to-white p-8 shadow-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-500">Movie Discovery</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-ink-900">
          Find your next pitch-ready story.
        </h1>
        <p className="mt-3 max-w-2xl text-ink-700">
          Search the OMDb catalog, open details, and add favorites to a watchlist that stays
          tied to your account.
        </p>
        <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-4 sm:flex-row">
          <input
            className="input flex-1"
            placeholder="Search movies by title..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" className="btn-primary">
            Search
          </button>
        </form>
        {!user && (
          <p className="mt-4 text-sm text-ink-500">
            Log in to unlock your personal watchlist.
          </p>
        )}
        {(actionMessage || lastError) && (
          <p className="mt-4 rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-700">
            {actionMessage || lastError}
          </p>
        )}
      </div>

      {status === "loading" && <LoadingPanel message="Searching the archive..." />}
      {status === "error" && (
        <EmptyPanel
          title="We hit a snag"
          description={error || "Something went wrong. Try again."}
        />
      )}
      {status === "empty" && (
        <EmptyPanel
          title="No matches"
          description="Try another title or double-check the spelling."
        />
      )}
      {status === "success" && (
        <MovieGrid>
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAdd={handleAdd}
              onRemove={handleRemove}
              inWatchlist={has(movie.id)}
            />
          ))}
        </MovieGrid>
      )}
    </section>
  );
}
