import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import { useAuth } from "./auth.jsx";
import { rtdb } from "../firebase/firebase.js";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [lastError, setLastError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return () => {};
    }
    if (!user) {
      setItems([]);
      setLoading(false);
      return () => {};
    }
    const watchRef = ref(rtdb, `watchlists/${user.id}`);
    const unsub = onValue(watchRef, (snapshot) => {
      const data = snapshot.val();
      setItems(Array.isArray(data?.items) ? data.items : []);
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const persist = async (next) => {
    if (!user) return { ok: false, message: "Please log in to manage your watchlist." };
    setItems(next);
    const watchRef = ref(rtdb, `watchlists/${user.id}`);
    try {
      await set(watchRef, { items: next });
      setLastError("");
      return { ok: true };
    } catch (error) {
      const message = error?.message || "Unable to update watchlist.";
      setLastError(message);
      return { ok: false, message };
    }
  };

  const add = async (movie) => {
    if (!user) {
      const message = "Please log in to add movies.";
      setLastError(message);
      return { ok: false, message };
    }
    if (items.some((item) => item.id === movie.id)) {
      const message = "This movie is already in your watchlist.";
      setLastError(message);
      return { ok: false, message };
    }
    const next = [...items, movie];
    return await persist(next);
  };

  const remove = async (movie) => {
    if (!user) {
      const message = "Please log in to remove movies.";
      setLastError(message);
      return { ok: false, message };
    }
    if (!items.some((item) => item.id === movie.id)) {
      const message = "This movie is not in your watchlist.";
      setLastError(message);
      return { ok: false, message };
    }
    const next = items.filter((item) => item.id !== movie.id);
    return await persist(next);
  };

  const has = (movieId) => items.some((item) => item.id === movieId);

  const value = useMemo(
    () => ({
      items,
      loading,
      add,
      remove,
      has,
      lastError
    }),
    [items, lastError, user, loading]
  );

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within WatchlistProvider");
  }
  return context;
}
