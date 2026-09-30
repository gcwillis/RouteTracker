# RouteTracker

RouteTracker is a climbing route tracking app. The React frontend displays routes and supports creating, editing, deleting, filtering, and sorting them. The ASP.NET Core API stores route data in SQLite.

## Requirements

- .NET 10 SDK
- Node.js and npm

## Run Locally

Start the API from the repository root:

```sh
cd RouteTracker.Api
dotnet run --launch-profile http
```

The API listens at `http://localhost:5025`. Keep it running, then start the frontend in a second terminal:

```sh
cd RouteTracker.React
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. Vite proxies `/api` requests to the API.

The API creates or updates `RouteTracker.db` in its working directory and applies database migrations on startup. It also seeds initial colors, grades, and a setter when those tables are empty.

## Frontend Checks

Run these commands from `RouteTracker.React`:

```sh
npm run build
npm run lint
```

## Project Structure

- `RouteTracker.Api/`: ASP.NET Core API, EF Core models, and SQLite data access.
- `RouteTracker.React/`: React, TypeScript, and Vite frontend.
- `RouteTracker.slnx`: .NET solution.