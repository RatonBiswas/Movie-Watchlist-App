import MovieCard from "../components/MovieCard.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import { EmptyPanel } from "../components/StatusPanel.jsx";
import { useWatchlist } from "../services/watchlist.jsx";
import { useAuth } from "../services/auth.jsx";

export default function WatchlistPage() {
  const { items, remove, loading } = useWatchlist();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="app-loader">
        <div className="app-spinner" aria-label="Loading" role="status" />
      </div>
    );
  }

  if (!items.length) {
    return (
      <EmptyPanel
        title="Your watchlist is empty"
        description="Search for a movie and add it to your watchlist."
      />
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-500">Saved Picks</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">
            {user?.name}'s Watchlist
          </h1>
        </div>
        <span className="rounded-full border border-surface-200 bg-surface-100 px-4 py-2 text-sm text-ink-700">
          {items.length} title{items.length === 1 ? "" : "s"}
        </span>
      </div>
      <MovieGrid>
        {items.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAdd={() => {}}
            onRemove={remove}
            inWatchlist
          />
        ))}
      </MovieGrid>
    </section>
  );
}
