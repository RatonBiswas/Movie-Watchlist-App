import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth.jsx";
import { useWatchlist } from "../services/watchlist.jsx";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const { items, loading: watchlistLoading } = useWatchlist();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logout successful.");
    navigate("/search");
  };
  return (
    <header className="border-b border-surface-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img
            src="https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/b7/8e/37/b78e3762-be54-fb9b-0d13-f7b12b2e5a96/AppIcon-0-0-1x_U007emarketing-0-7-0-0-sRGB-85-220.png/256x256bb.jpg"
            alt="Watchlist Studio logo"
            className="h-10 w-10 rounded-2xl shadow-glow"
            loading="lazy"
          />
          <div>
            <p className="font-display text-lg font-semibold">Watchlist Studio</p>
            <p className="text-xs text-ink-500">Search. Save. Pitch.</p>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm font-semibold">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link--active" : ""}`
            }
          >
            Search
          </NavLink>
          {loading ? (
            <span className="text-ink-400">Watchlist</span>
          ) : user ? (
            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link--active" : ""}`
              }
            >
              Watchlist{watchlistLoading ? "" : ` (${items.length})`}
            </NavLink>
          ) : null}
          {loading ? null : user ? (
            <button onClick={handleLogout} className="btn-ghost">
              Logout
            </button>
          ) : (
            <NavLink to="/auth" className="btn-primary">
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
