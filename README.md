
# 🏨 Hotel Assignment  
**Full-Stack Demo · Node.js + TypeScript · Temporal Workflows · React + Vite**

Search a city, have the backend fetch rates from two (often unreliable) hotel-supplier APIs in **parallel**, and always get the cheapest price—thanks to Temporal’s fault-tolerant Workflow engine.

---

## 📌 Project Goals
* **Reliability** — Seamless retries, time-outs, and user-initiated cancellations handled by Temporal.  
* **End-to-End Type Safety** — One language (TypeScript) across UI, API, worker, and tests.  
* **Observability** — Inspect & replay every Workflow Execution in Temporal Web UI.  
* **Easy Local Dev** — One command spins up the Temporal Service, Web UI, and default Namespace.

---

## ✨ Live Features
| Area | Capability |
|------|------------|
| **Frontend** | City + check-in/out form, client-side validation, loading indicator, success & error states |
| **Workflow** | Suppliers A & B queried **concurrently** · 5 s time-out · automatic retries |
| **Result Selection** | Cheapest price wins; deterministic tie-break (Supplier A if equal) |
| **Mock Suppliers** | Endpoints randomly delay, error, or return empty lists |
| **Web UI** | Inspect a Workflow’s full event history in real time |

---

## 🛠 Tech Stack
| Layer          | Tech |
|----------------|------|
| **UI**         | React 18, Vite 5, shadcn/ui (Radix UI + Tailwind CSS), TanStack Query |
| **API**        | Node 20, Express 4, Axios |
| **Workflows**  | Temporal SDK (TypeScript v1.11) |
| **Testing**    | Jest (backend & workflows), Vitest (frontend) |
| **Tooling**    | TypeScript 5, ESLint 9, Nodemon, ts-node |

---

## ⚙ Requirements
* **Node.js** ≥ 18 (20 LTS recommended)  
* **npm** ≥ 9 (or pnpm / yarn)  
* **Temporal CLI** ≥ 1.0 (see install step below)  
* **Docker** *(optional)* if you prefer a containerized Temporal cluster  

---

## 🚀 Local Setup

### 1 · Clone & install
```bash
git clone https://github.com/<your-org>/HotelAssignment.git
cd HotelAssignment
npm install --workspaces          # installs backend + frontend
````

### 2 · Install Temporal CLI & start dev server

```bash
# macOS (Homebrew)
brew install temporal

# Linux / Windows: download a binary from https://docs.temporal.io/cli/setup-cli

# start an in-memory Temporal Service
temporal server start-dev
```

* Service endpoint: **localhost:7233**
* Web UI: **[http://localhost:8233](http://localhost:8233)** ([learn.temporal.io][1])

(Optional) register a dedicated Namespace:

```bash
temporal namespace create --namespace hotel-search --description "Hotel Assignment dev"
```

Leave this terminal running while you develop.

### 3 · Run the stack (3 terminals)

| #     | Command                       | Outcome                                                          |
| ----- | ----------------------------- | ---------------------------------------------------------------- |
| **A** | `npm run dev     -w backend`  | Express API → **[http://localhost:3000](http://localhost:3000)** |
| **B** | `npm run worker  -w backend`  | Temporal worker (listens on `hotel-search`)                      |
| **C** | `npm run dev     -w frontend` | React SPA → **[http://localhost:5173](http://localhost:5173)**   |

Open **[http://localhost:5173](http://localhost:5173)**, submit a search, and watch the rates roll in!

---

## 📝 Scripts Reference

<details><summary><strong>Backend</strong></summary>

| Script   | Purpose                           |
| -------- | --------------------------------- |
| `dev`    | Hot-reload API (Nodemon)          |
| `worker` | Run Temporal worker               |
| `build`  | Compile TypeScript for production |
| `test`   | Jest unit + workflow tests        |
| `lint`   | ESLint checks                     |

</details>

<details><summary><strong>Frontend</strong></summary>

| Script    | Purpose                  |
| --------- | ------------------------ |
| `dev`     | Vite dev server (HMR)    |
| `build`   | Production bundle        |
| `preview` | Serve built bundle       |
| `lint`    | ESLint checks            |
| `test`    | Vitest tests *(roadmap)* |

</details>

---

## 🧪 Testing Matrix

| Scenario                | Expected Result                   |
| ----------------------- | --------------------------------- |
| A cheaper               | Return A                          |
| B cheaper               | Return B                          |
| Tie                     | Deterministically pick A          |
| A fails, B succeeds     | Return B                          |
| Both fail               | API returns 500                   |
| One supplier > 5 s      | Cancel slow call, use fast result |
| A fails twice then OK   | Retry, return A                   |
| User cancels mid-search | Workflow cancels gracefully       |

Run backend tests:

```bash
npm test -w backend
```

---

## 🚧 Known Limitations

* Mock suppliers are stateless; no real inventory.
* No authentication or persistence layer.
* Front-end unit tests are placeholders (help welcome!).

---

## 🤝 Contributing

1. Fork → `git checkout -b feat/my-improvement`
2. `npm run lint && npm run test` (all green)
3. Open a Pull Request — thanks! ✨

---

## 📄 License

**ISC** © 2025 Your Name

```

::contentReference[oaicite:1]{index=1}
```

[1]: https://learn.temporal.io/getting_started/typescript/dev_environment/ "Set up a local development environment for Temporal and TypeScript | Learn Temporal"
