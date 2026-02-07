import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/omdb.js";
import { useWatchlist } from "../services/watchlist.jsx";
import { EmptyPanel, LoadingPanel } from "../components/StatusPanel.jsx";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const { add, remove, has, lastError } = useWatchlist();
  const [actionMessage, setActionMessage] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchMovie = async () => {
      setStatus("loading");
      const response = await getMovieDetails(id);
      if (!mounted) return;
      if (!response.ok) {
        setStatus("error");
        setError(response.error);
        return;
      }
      setMovie(response.data);
      setStatus("success");
    };
    fetchMovie();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (status === "loading") {
    return <LoadingPanel message="Loading details..." />;
  }

  if (status === "error") {
    return (
      <EmptyPanel
        title="Movie not available"
        description={error || "Please try again."}
        action={
          <Link to="/search" className="btn-ghost mt-4 inline-flex">
            Back to Search
          </Link>
        }
      />
    );
  }

  const inWatchlist = has(movie.id);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full max-w-sm">
          <div className="glass overflow-hidden rounded-3xl">
            <div className="aspect-[2/3] bg-white/5">
              {movie.poster ? (
                <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-white/50">
                  No poster
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-ink-500">Movie Details</p>
          <h1 className="font-display text-4xl font-semibold">{movie.title}</h1>
          <div className="flex flex-wrap gap-3 text-sm text-ink-500">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.released}</span>
            <span>•</span>
            <span>IMDB {movie.rating}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-surface-200 bg-surface-100 px-3 py-1 text-xs text-ink-700"
              >
                {genre}
              </span>
            ))}
          </div>
          <p className="text-ink-700">{movie.plot}</p>
          {(actionMessage || lastError) && (
            <p className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-700">
              {actionMessage || lastError}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            {inWatchlist ? (
              <button
                onClick={async () => {
                  const result = await remove(movie);
                  if (result?.ok === false) setActionMessage(result.message);
                  else setActionMessage("");
                }}
                className="btn-primary"
              >
                Remove from Watchlist
              </button>
            ) : (
              <button
                onClick={async () => {
                  const result = await add(movie);
                  if (result?.ok === false) setActionMessage(result.message);
                  else setActionMessage("");
                }}
                className="btn-primary"
              >
                Add to Watchlist
              </button>
            )}
            <Link to="/search" className="btn-ghost">
              Back to Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
