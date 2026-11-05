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

## Run with Docker

Build and run the API and frontend as separate containers on the same Docker network:

```sh
docker network create routetracker
docker build -t routetracker-api ./RouteTracker.Api
docker run -d --name api --network routetracker -p 8080:8080 -v routetracker-data:/data routetracker-api

docker build -t routetracker-react ./RouteTracker.React
docker run -d --name web --network routetracker -p 8081:80 routetracker-react
```

Open `http://localhost:8081`. The frontend proxies `/api` requests to the `api` container and strips the `/api` prefix. The API listens on port `8080`; its SQLite database is stored in the `routetracker-data` volume. Set `API_URL` on the frontend container if the API is reachable at a different address on the Docker network.

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