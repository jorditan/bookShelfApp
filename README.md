# BookShelf

A small full-stack example application: a Go backend and a React + Vite frontend.

## Overview

BookShelf provides a simple REST API for managing books and a frontend UI to interact with it. The repository contains two main parts:

- `backend/` — Go server (API) and related internal packages.
- `frontend/` — React + Vite TypeScript client.

## Tech stack

- Backend: Go
- Frontend: React, TypeScript, Vite

## Prerequisites

- Go (1.20+ recommended)
- Node.js (16+), and a package manager such as `pnpm` or `npm`

## Quick start

1) Run the backend

```bash
cd backend
go run ./cmd/api
```

2) Run the frontend (using pnpm)

```bash
cd frontend
pnpm install
pnpm dev
```

Or with npm:

```bash
cd frontend
npm install
npm run dev
```

## Project structure (high level)

- `backend/`
  - `cmd/api` — main application entry
  - `internal/db` — database connection helper
  - `internal/model` — domain models (e.g., `book.go`)
  - `internal/service` — business logic
  - `internal/store` — persistence layer
  - `internal/transport` — HTTP handlers and middleware
- `frontend/` — Vite + React app (TypeScript)

## Useful links

- Backend README: [backend/README.md](backend/README.md)
- Frontend README: [frontend/README.md](frontend/README.md)

## Contributing

If you want to contribute, start by running both services locally and open a PR with small, focused changes. See the internal READMEs for more details.

## License

This project does not include a license file. Add one if you plan to publish or share the code publicly.
