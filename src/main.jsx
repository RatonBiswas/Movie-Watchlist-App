import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./services/auth.jsx";
import { WatchlistProvider } from "./services/watchlist.jsx";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AuthProvider>
        <WatchlistProvider>
          <App />
          <Toaster
            position="top-center"
            containerStyle={{ zIndex: 99999, top: 80 }}
            toastOptions={{
              duration: 2500,
              style: {
                background: "#111827",
                color: "#fff",
                borderRadius: "14px",
                padding: "10px 14px"
              }
            }}
          />
        </WatchlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
