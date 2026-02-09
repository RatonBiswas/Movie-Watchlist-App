import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth.jsx";
import toast from "react-hot-toast";

export default function AuthPage() {
  const { user, loading, login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      navigate("/watchlist");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl">
        <div className="app-loader">
          <div className="app-spinner" aria-label="Loading" role="status" />
        </div>
      </section>
    );
  }

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    const action =
      mode === "login"
        ? await login(form.email, form.password)
        : await signup({ name: form.name, email: form.email, password: form.password });
    if (!action.ok) {
      setStatus({ type: "error", message: action.message });
    } else {
      setStatus({ type: "success", message: "Authenticated. Redirecting to watchlist..." });
      toast.success("You are now signed in.");
      navigate("/watchlist");
    }
  };

  const handleGoogle = async () => {
    setStatus(null);
    const action = await loginWithGoogle();
    if (!action.ok) {
      setStatus({ type: "error", message: action.message });
    } else {
      setStatus({ type: "success", message: "Authenticated. Redirecting to watchlist..." });
      toast.success("Signed in with Google.");
      navigate("/watchlist");
    }
  };

  return (
    <section className="mx-auto max-w-6xl">
      <div className="grid min-h-[70vh] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="auth-hero reveal">
          <div className="auth-hero__content">
            <p className="auth-hero__eyebrow">Cinema Edition</p>
            <h1 className="auth-hero__title">
              Build a watchlist
              <br />
              with taste.
            </h1>
            <p className="auth-hero__subtitle">
              Curate picks, track what you love, and save the perfect next‑movie night.
            </p>
            <div className="auth-hero__chips">
              <span>Private lists</span>
              <span>Fast search</span>
              <span>Instant sync</span>
            </div>
            <div className="auth-hero__stats">
              <div>
                <p>450K+</p>
                <span>Titles indexed</span>
              </div>
              <div>
                <p>2 min</p>
                <span>Setup time</span>
              </div>
            </div>
            <button className="auth-hero__cta">
              Explore features
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="auth-form-wrap reveal">
          <div className="auth-form glass w-full rounded-[28px] p-10">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-lg font-bold text-white">
                W
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-ink-900">
                {mode === "login" ? "Log in to your account" : "Create your account"}
              </h2>
              <p className="mt-2 text-sm text-ink-500">
                Use email and password or continue with Google.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={handleGoogle}
                className="btn-ghost w-full gap-2 bg-white"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-ink-900 shadow">
                  G
                </span>
                Continue with Google
              </button>
            </div>

            <div className="my-6 flex items-center gap-3 text-xs text-ink-500">
              <div className="h-px flex-1 bg-surface-200" />
              <span>OR</span>
              <div className="h-px flex-1 bg-surface-200" />
            </div>

            <div className="mb-4 flex items-center gap-2 rounded-full bg-surface-100 p-1 text-sm">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 rounded-full px-3 py-2 font-semibold transition ${
                  mode === "login"
                    ? "bg-white text-brand-700 shadow-card"
                    : "text-ink-500 hover:text-ink-900"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-full px-3 py-2 font-semibold transition ${
                  mode === "signup"
                    ? "bg-white text-brand-700 shadow-card"
                    : "text-ink-500 hover:text-ink-900"
                }`}
              >
                Sign up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              )}
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              {status && (
                <p
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    status.type === "error"
                      ? "bg-red-500/10 text-red-700"
                      : "bg-emerald-500/10 text-emerald-700"
                  }`}
                >
                  {status.message}
                </p>
              )}
              <button type="submit" className="btn-primary w-full">
                {mode === "login" ? "Continue" : "Create account"}
              </button>
              <p className="text-center text-xs text-ink-500">
                {mode === "login" ? "Don’t have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="font-semibold text-brand-700"
                >
                  {mode === "login" ? "Sign up" : "Log in"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
