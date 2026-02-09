import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage.jsx";
import WatchlistPage from "./pages/WatchlistPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import { useAuth } from "./services/auth.jsx";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="app-loader">
        <div className="app-spinner" aria-label="Loading" role="status" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

export default function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage !== "fadeOut") return;
    const timeout = window.setTimeout(() => {
      setDisplayLocation(location);
      setTransitionStage("fadeIn");
    }, 180);
    return () => window.clearTimeout(timeout);
  }, [transitionStage, location]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    elements.forEach((el) => observer.observe(el));

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.classList?.contains("reveal")) {
            observer.observe(node);
          }
          node.querySelectorAll?.(".reveal").forEach((child) => observer.observe(child));
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [displayLocation]);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className={`route-shell ${transitionStage}`}>
          <Routes location={displayLocation}>
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
        </div>
      </main>
    </div>
  );
}
