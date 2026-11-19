# Interview Prep App

A personal interview-preparation tracker for full-stack (Angular-focused) roles. It tracks a fully
customisable syllabus from HTML to AI, turns course notes into polished study material with AI,
generates every type of interview question, plans study time and runs mock interviews.

**Stack:** Angular 22 (standalone, Signals, zoneless, Tailwind) · Express 5 + TypeScript + Zod ·
PostgreSQL + Drizzle ORM + pgvector · Claude API + Ollama · Docker · GitHub Actions

## Status

| Phase | What                                                            | Status  |
| ----- | --------------------------------------------------------------- | ------- |
| 0     | Monorepo, Docker Compose, Drizzle schema, auth, CI              | Done    |
| 1     | Tracker MVP: syllabus, tech catalog, courses, notes, dashboard  | Next    |
| 2     | AI notes: uploads, photo to text, refine, AI syllabus generator | Planned |
| 3     | Question engine and flashcards (spaced repetition)              | Planned |
| 4     | Planner (templates, AI, job-description gaps, replan)           | Planned |
| 5     | AI mock interview                                               | Planned |
| 6     | Ask my notes (RAG), deploy, end-to-end tests                    | Planned |

## Getting started

Requirements: Node 22+, Docker.

```bash
cp .env.example .env                       # then set JWT_SECRET (32+ chars)
docker compose up -d postgres              # database
ollama pull nomic-embed-text               # embeddings model (uses your installed Ollama)
npm install                                # also builds packages/shared
npm run db:migrate
npm run db:seed                            # optional demo user: demo@prep.local / demo-password
npm run dev                                # API on :3000, web on :4200
```

Open http://localhost:4200 and create an account. Every new account gets the default syllabus
(7 tracks, 15 modules, 109 topics), which you can edit.

To run everything in containers instead: `docker compose --profile app up --build`, then open
http://localhost:8080.

## Repository layout

```
apps/
  web/              Angular app (core/, features/, lazy routes)
  api/              Express 5 API
    src/config      env validation (Zod)
    src/db          Drizzle schema, migrations runner, seed data
    src/modules     feature modules (auth, health, ...): routes + service
    src/middleware  auth, validation, errors
    drizzle/        generated SQL migrations
packages/
  shared/           Zod schemas and types used by both apps
docker/             Dockerfiles and nginx config
.github/workflows/  CI
```

## Useful scripts

| Command               | What it does                                 |
| --------------------- | -------------------------------------------- |
| `npm run dev`         | API + web with hot reload                    |
| `npm test`            | API and web unit tests                       |
| `npm run lint`        | Type-check API and check formatting          |
| `npm run db:generate` | Create a migration after changing the schema |
| `npm run db:migrate`  | Apply migrations                             |
| `npm run db:studio`   | Browse the database in Drizzle Studio        |

## API (Phase 0)

| Method | Path                    | Notes                                 |
| ------ | ----------------------- | ------------------------------------- |
| GET    | `/api/v1/health`        | Health check                          |
| POST   | `/api/v1/auth/register` | Creates the user and default syllabus |
| POST   | `/api/v1/auth/login`    | Sets an httpOnly JWT cookie           |
| POST   | `/api/v1/auth/logout`   | Clears the cookie                     |
| GET    | `/api/v1/auth/me`       | Current user                          |
