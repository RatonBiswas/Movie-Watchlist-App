import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../services/auth.jsx";

export default function MovieCard({ movie, onAdd, onRemove, inWatchlist }) {
  const { user } = useAuth();

  const handleAdd = async () => {
    if (!onAdd) return;
    if (!user) {
      toast.error("Please log in first.");
      return;
    }
    toast.success(`Added to watchlist: ${movie.title}`);
    void onAdd(movie);
  };

  const handleRemove = async () => {
    if (!onRemove) return;
    if (!user) {
      toast.error("Please log in first.");
      return;
    }
    toast.success(`Removed from watchlist: ${movie.title}`);
    void onRemove(movie);
  };

  return (
    <div className="glass flex h-full flex-col overflow-hidden rounded-3xl">
      <div className="aspect-[2/3] w-full overflow-hidden bg-white/5">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/50">
            No poster
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-lg font-semibold text-ink-900">{movie.title}</p>
          <p className="text-sm text-ink-500">{movie.year}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          <Link to={`/movie/${movie.id}`} className="btn-ghost">
            Details
          </Link>
          {inWatchlist ? (
            <button onClick={handleRemove} className="btn-primary">
              Remove
            </button>
          ) : (
            <button onClick={handleAdd} className="btn-primary">
              + Watchlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
