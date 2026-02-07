import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage.jsx";
import WatchlistPage from "./pages/WatchlistPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import { useAuth } from "./services/auth.jsx";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

export default function App() {
  return (
    <div className="min-h-screen bg-surface-50 text-ink-900">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <WatchlistPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/search" replace />} />
        </Routes>
      </main>
    </div>
  );
}
