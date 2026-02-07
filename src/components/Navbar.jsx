import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/search");
  };

  return (
    <header className="border-b border-white/10 bg-ink-900/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-500 text-xl font-bold shadow-glow">
            W
          </div>
          <div>
            <p className="font-display text-lg font-semibold">Watchlist Studio</p>
            <p className="text-xs text-white/60">Search. Save. Pitch.</p>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm font-semibold">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `transition ${isActive ? "text-accent-500" : "text-white/80 hover:text-white"}`
            }
          >
            Search
          </NavLink>
          {user && (
            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                `transition ${isActive ? "text-accent-500" : "text-white/80 hover:text-white"}`
              }
            >
              Watchlist
            </NavLink>
          )}
          {user ? (
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
