import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth.jsx";

export default function AuthPage() {
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState(null);

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
      navigate("/watchlist");
    }
  };

  return (
    <section className="mx-auto max-w-4xl">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-ink-500">
            Firebase Authentication
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight">
            Sign in to protect your watchlist and pitch like a pro.
          </h1>
          <p className="mt-4 text-ink-700">
            This prototype uses Firebase Email/Password authentication. Sessions persist
            automatically and watchlists are stored by user ID in Firestore.
          </p>
        </div>

        <div className="glass rounded-3xl p-8">
          <div className="flex gap-4">
            <button
              onClick={() => setMode("login")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-brand-600 text-white"
                  : "text-ink-500 hover:text-ink-900"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "signup"
                  ? "bg-brand-600 text-white"
                  : "text-ink-500 hover:text-ink-900"
              }`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              {mode === "login" ? "Login" : "Create account"}
            </button>
            <div className="flex items-center gap-3 text-xs text-ink-500">
              <div className="h-px flex-1 bg-surface-200" />
              <span>OR</span>
              <div className="h-px flex-1 bg-surface-200" />
            </div>
            <button
              type="button"
              onClick={handleGoogle}
              className="btn-ghost w-full gap-2"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-ink-900">
                G
              </span>
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
