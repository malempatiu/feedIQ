# feedIQ

feedIQ is a full-stack application for collecting, categorizing, and managing product feedback. The project consists of a **React/Vite** client and a **FastAPI** backend with background tasks orchestrated by Inngest. It is designed to be modular, extensible, and easy to run locally or deploy.

---

## 🗂 Repository Structure

```text
client/                # Frontend app (React + TypeScript + TailwindCSS)
server/                # Backend API (Python + FastAPI)
``` 

### client/
- **src/**: main application code
  - `api/` – network helpers and types
  - `features/` – feature-specific components and hooks (feedbacks, roadmap, users)
  - `routes/` – authenticated and unauthenticated route trees
  - `shared/` – common hooks and utilities
  - `ui/` – design system components
- `public/` – static assets
- Configuration files (`vite.config.ts`, `tsconfig.json`, `package.json`, etc.)

### server/
- **src/**: backend source code
  - `auth/` – authentication logic, routers, services, models
  - `feeds/` – feedback API endpoints and service layer
  - `background_tasks/` – Inngest client, background workflows
  - `db/` – SQLAlchemy models, session management
  - `workflows/` – pure-Python workflows executed by Inngest
- `migrations/` – Alembic database migrations
- Docker and deployment artifacts (`Dockerfile`, `docker-compose.yml`, `requirements.txt`)

---

## 🛠 Prerequisites

- **Node.js** (v16+ recommended) for the client
- **Python** (3.10+) for the server
- **PostgreSQL** database (local or managed)
- Optional: Docker & docker-compose for containerized development

---

## 🚀 Getting Started

### Backend (server)

1. **Create a virtual environment**:
   ```bash
   cd server
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Configure environment variables** (see `server/.env.example` if present). At minimum:
   ```env
   DATABASE_URL=postgresql://user:pass@localhost/feediq
   INNGEST_API_KEY=...         # for background tasks
   ```

3. **Run migrations**:
   ```bash
   alembic upgrade head
   ```

4. **Start development server**:
   ```bash
   uvicorn src.main:app --reload
   ```

- Swagger UI available at `http://localhost:8000/api/v1/docs`
- OpenAPI spec at `http://localhost:8000/api/v1/openapi.json` (Inngest endpoints are hidden)

### Frontend (client)

1. **Install dependencies**:
   ```bash
   cd client
   npm install
   ```

2. **Configure** (create `.env.local` if needed):
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```

3. **Run dev server**:
   ```bash
   npm run dev
   ```

App will open at `http://localhost:5173` by default.

---

## 📦 Features Overview

- **User Authentication**: signup/login with JWT-based sessions
- **Feedback Management**: create, list, filter, and vote on product feedback items
- **Background Classification**: user feedback automatically categorized by sentiment workflows via Inngest
- **Roadmap View**: planned features and statuses (under `client/features/roadmap`)
- **Role-based UI**: client shows different views based on user auth state

---

## 🛡 Security & Docs

- Inngest API routes are automatically registered but hidden from Swagger docs using a custom OpenAPI filter in `server/src/main.py`.
- CORS configured to allow the client origin (`http://localhost:5173`). Update `origins` list as needed.

---

## 🧪 Testing

- Backend tests live in `server/src/tests` and use pytest.
- Run all tests with:
  ```bash
  cd server
  pytest
  ```

- Frontend can be tested using your preferred React testing setup (add Jest/Testing Library if not already configured).

---

## 🐳 Docker (optional)

A `docker-compose.yml` file is provided to spin up the backend, database, and other dependencies. Use:

```bash
# Start containers
docker-compose up --build

# Run migrations inside server container
docker-compose exec server alembic upgrade head
```


---

## 💡 Tips & Notes

- The custom OpenAPI generator caches the schema after first call; there is no runtime overhead for normal requests.
- Add new routers/services by creating them in `server/src/` and including them in `main.py` with appropriate prefixes and tags.
- In the client, follow the `features/*` pattern: components, hooks, and subcomponents grouped by feature.

---

## 🏗 Architectural Overview

```mermaid
flowchart LR
    subgraph Client
        A[React + Vite SPA]
    end

    subgraph Server
        B[FastAPI Server]
        C[(PostgreSQL DB)]
        D[Inngest Background Worker]
        E[Workflow: categorize feedback]
        F[LangChain / LangGraph]
        B --> C
        B --> D
        D --> E
        E --> F
    end

    A -->|API calls| B

    classDef external fill:#f9f,stroke:#333,stroke-width:1px;
    class C,E external
```

The diagram above illustrates the high-level interactions:

1. **Client**: a React/Vite single-page application making REST requests to the backend.
2. **Server**: FastAPI exposes feedback and auth endpoints; communicates with the database and forwards events to Inngest.
3. **Inngest Worker**: processes background workflows such as sentiment categorization and stores results back in the database.


## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Inngest for Python](https://docs.inngest.com/)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
