import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/omdb.js";
import { useWatchlist } from "../services/watchlist.jsx";
import { EmptyPanel, LoadingPanel } from "../components/StatusPanel.jsx";
import toast from "react-hot-toast";
import { useAuth } from "../services/auth.jsx";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const { add, remove, has, lastError } = useWatchlist();
  const [actionMessage, setActionMessage] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [movie, setMovie] = useState(null);
  const { user } = useAuth();

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
  const displayTitle = movie.title?.replace(/\s*\.{3,}\s*$/, "") || movie.title;

  return (
    <section className="reveal space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full max-w-sm">
          <div className="poster-card glass overflow-hidden rounded-3xl">
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

        <div className="details-card glass flex flex-1 flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.3em] text-ink-500">Movie Details</p>
          <h1
            className="font-display text-4xl font-semibold break-words"
            title={movie.title}
          >
            {displayTitle}
          </h1>
          <div className="flex flex-wrap gap-3 text-sm text-ink-500">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.released}</span>
            <span>•</span>
            <span>IMDB {movie.rating}</span>
          </div>
          <div className="genre-list">
            {movie.genres.map((genre) => (
              <span key={genre} className="genre-chip genre-chip--stamp">
                {genre}
              </span>
            ))}
          </div>
          <p className="text-ink-700">{movie.plot}</p>
          <div className="mt-auto flex flex-wrap justify-end gap-3">
            {inWatchlist ? (
              <button
                onClick={async () => {
                  if (!user) {
                    setActionMessage("Please log in first.");
                    toast.error("Please log in first.");
                    return;
                  }
                  toast.success(`Removed from watchlist: ${movie.title}`);
                  void remove(movie);
                  setActionMessage("");
                }}
                className="btn-primary"
              >
                Remove from Watchlist
              </button>
            ) : (
              <button
                onClick={async () => {
                  if (!user) {
                    setActionMessage("Please log in first.");
                    toast.error("Please log in first.");
                    return;
                  }
                  toast.success(`Added to watchlist: ${movie.title}`);
                  void add(movie);
                  setActionMessage("");
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
