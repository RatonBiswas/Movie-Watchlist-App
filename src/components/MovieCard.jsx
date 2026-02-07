import { Link } from "react-router-dom";

export default function MovieCard({ movie, onAdd, onRemove, inWatchlist }) {
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
          <p className="text-lg font-semibold">{movie.title}</p>
          <p className="text-sm text-white/60">{movie.year}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          <Link to={`/movie/${movie.id}`} className="btn-ghost">
            Details
          </Link>
          {inWatchlist ? (
            <button onClick={() => onRemove(movie)} className="btn-primary">
              Remove
            </button>
          ) : (
            <button onClick={() => onAdd(movie)} className="btn-primary">
              + Watchlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
