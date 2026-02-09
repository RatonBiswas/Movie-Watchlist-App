import { useEffect, useState } from "react";
import { searchMovies } from "../services/omdb.js";
import { useWatchlist } from "../services/watchlist.jsx";
import MovieCard from "../components/MovieCard.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import { EmptyPanel, LoadingPanel } from "../components/StatusPanel.jsx";

export default function SearchPage() {
  const { add, remove, has } = useWatchlist();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setStatus("idle");
      setError("");
      setResults([]);
      return;
    }

    setStatus("loading");
    const handle = window.setTimeout(async () => {
      const response = await searchMovies(trimmed);
      if (!response.ok) {
        const message = response.error || "No records found.";
        const normalized = message.toLowerCase();
        if (normalized.includes("too many results") || normalized.includes("movie not found")) {
          setStatus("empty");
          setError("No records found.");
        } else {
          setStatus("error");
          setError(message);
        }
        setResults([]);
        return;
      }
      setResults(response.data);
      setStatus(response.data.length ? "success" : "empty");
    }, 500);

    return () => window.clearTimeout(handle);
  }, [query]);

  return (
    <section className="space-y-8">
      <div className="reveal rounded-3xl bg-gradient-to-br from-brand-100 via-white to-white p-8 shadow-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-500">Movie Discovery</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-ink-900">
          Find your next pitch-ready story.
        </h1>
        <p className="mt-3 max-w-2xl text-ink-700">
          Search the OMDb catalog, open details, and add favorites to a watchlist that stays
          tied to your account.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <input
              className="input w-full pr-12"
              placeholder="Search movies by title..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-surface-200 bg-white px-2 py-1 text-xs font-semibold text-ink-500 hover:text-ink-900"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
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
              onAdd={add}
              onRemove={remove}
              inWatchlist={has(movie.id)}
            />
          ))}
        </MovieGrid>
      )}
    </section>
  );
}
