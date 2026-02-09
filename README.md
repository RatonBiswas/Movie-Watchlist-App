# Movie Watchlist App

React + Tailwind prototype for a movie watchlist. Includes Firebase authentication, search, details, and a per-user watchlist stored in Firebase Realtime Database.

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
   cp .env.example .env
   ```
3. Run the app:
   ```bash
   npm run dev
   ```

## Firebase
- Email/Password auth via Firebase Authentication.
- Watchlists stored in Realtime Database under `watchlists/{userId}`.
- Firebase config lives in `src/firebase/firebase.js` and is loaded from `.env`.

### Setup Checklist
1. Create a Firebase project.
2. Enable Authentication → Email/Password.
3. Create a Realtime Database (in production or test mode).
4. Add a web app in Firebase and copy the config to `.env`.
5. Restart the dev server after editing `.env`.

### Realtime Database Rules (Suggested)
```text
{
  "rules": {
    "watchlists": {
      "$userId": {
        ".read": "auth != null && auth.uid == $userId",
        ".write": "auth != null && auth.uid == $userId"
      }
    }
  }
}
```

## Demo Video
- Google Drive link: ADD_LINK_HERE
