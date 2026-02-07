import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth.jsx";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
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
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-xl font-bold text-white shadow-glow">
            W
          </div>
          <div>
            <p className="font-display text-lg font-semibold">Watchlist Studio</p>
            <p className="text-xs text-ink-500">Search. Save. Pitch.</p>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm font-semibold">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `transition ${isActive ? "text-brand-600" : "text-ink-700 hover:text-ink-900"}`
            }
          >
            Search
          </NavLink>
          {user && (
            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                `transition ${isActive ? "text-brand-600" : "text-ink-700 hover:text-ink-900"}`
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
