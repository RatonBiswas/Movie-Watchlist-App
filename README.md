# Movie Watchlist App

React + Tailwind prototype for a movie watchlist. Includes Firebase authentication, search, details, and a per-user watchlist stored in Firestore.

## Features
- Search movies by title using the OMDb API.
- View movie details with poster, plot, genres, release date, and rating.
- Add/remove movies from a per-user watchlist.
- Firebase Email/Password login/signup.

## Tech Stack
- React + Vite
- Tailwind CSS
- React Router

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root:
   ```bash
   VITE_OMDB_API_KEY=your_omdb_api_key
   ```
3. Run the app:
   ```bash
   npm run dev
   ```

## Firebase
- Email/Password auth via Firebase Authentication.
- Watchlists stored in Firestore under `watchlists/{userId}`.
- Firebase config lives in `src/firebase/firebase.js` and is loaded from `.env`.

### Setup Checklist
1. Create a Firebase project.
2. Enable Authentication → Email/Password.
3. Create a Firestore database (in production or test mode).
4. Add a web app in Firebase and copy the config to `.env`.
5. Restart the dev server after editing `.env`.

### Firestore Rules (Suggested)
```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /watchlists/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}


