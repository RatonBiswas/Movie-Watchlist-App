import MovieCard from "../components/MovieCard.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import { EmptyPanel } from "../components/StatusPanel.jsx";
import { useWatchlist } from "../services/watchlist.jsx";
import { useAuth } from "../services/auth.jsx";

export default function WatchlistPage() {
  const { items, remove } = useWatchlist();
  const { user } = useAuth();

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
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Saved Picks</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">
            {user?.name}'s Watchlist
          </h1>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
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
