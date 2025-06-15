# 📝 React Todo App — AltSchool Africa Assignment

This is a Todo List web app I built as part of my **AltSchool Africa Frontend project**. It's powered by modern frontend technologies like React, Zustand, Tailwind CSS, and TanStack Query. This project helped me explore the world of real-time API integration, client-side routing, and state management — all while working on a real-world CRUD application.

---

## 🎯 Project Goals

- Build a responsive and modern Todo app
- Practice CRUD operations
- Implement state and API management
- Handle routing and error boundaries
- Learn how to work with browser storage
- Prepare for production deployment using Vercel

---

## 📌 Key Features

- ✅ Add, edit, and delete todos
- 🔍 Search and filter todos (All, Completed, Pending)
- 📄 Paginated todo list
- ⚙️ Todo detail view for each item
- 💾 Syncs with `localStorage` for offline support
- 📱 Responsive design using Tailwind and ShadCN
- 🧠 State handled with Zustand and TanStack Query
- 🐞 Error boundaries for better error handling
- 🎭 Skeleton loaders for a better UX
- 🌙 Dark and light theme toggle

---

## 🧱 Tech Stack & Libraries

| Category       | Technology / Library                                |
|----------------|-----------------------------------------------------|
| **Framework**  | React (via Vite)                                    |
| **Routing**    | React Router v7 (my first time using it!)           |
| **Data Fetching** | TanStack Query (also first time!)              |
| **State Mgmt** | Zustand                                              |
| **Styling**    | Tailwind CSS                                        |
| **UI Kit**     | ShadCN UI                                           |
| **Icons**      | Iconify                                              |
| **HTTP Client**| Axios                                                |
| **Package Mgr**| pnpm                                                 |

---

## 🤯 Challenges I Faced

### 🧵 React Router v7
This was my **first time using React Router v7**, and learning how nested routing and dynamic params worked (`/todos/:id`) was a bit tricky. I also had to learn how to handle unknown routes using the `*` path and how to ensure everything still works after deployment on Vercel using `vercel.json`.

### ⚡ TanStack Query
Using **TanStack Query for the first time** was both fun and challenging. I had to understand concepts like `useQuery`, caching, invalidation, and managing async state without `useEffect`. The biggest benefit I noticed was how much boilerplate it removed.

### 🔄 Syncing with DummyJSON
I used [DummyJSON](https://dummyjson.com/docs/todos) as my fake API. It helped me mimic real-world API behavior. The only catch is that all API operations are simulated, and data isn't persisted across sessions — so I used `localStorage` to store todos and sync them during runtime.

---

## 📦 Project Setup

### 1. Clone & Install

```bash
git clone https://github.com/Reuben-10/react-to-do.git
cd react-to-do
pnpm install


### 2. Install Dependencies
```bash
pnpm install
```

---

## 🧪 Running the App Locally

```bash
pnpm dev
# or
pnpm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚒️ Available Scripts & Commands

```bash
pnpm dev         # Run app in development mode
pnpm build       # Create production build
pnpm preview     # Preview production build locally
```

---

## 🧾 API Reference (DummyJSON)

**Todo Object Example:**
```json
{
  "id": 1,
  "todo": "Do something nice for someone you care about",
  "completed": false,
  "userId": 152
}
```

**Endpoints:**
- `GET /todos` — Fetch all todos
- `POST /todos` — Add a new todo
- `PUT /todos/:id` — Update a todo
- `DELETE /todos/:id` — Delete a todo

Note: These changes do not persist on the DummyJSON server, so I used localStorage to simulate real persistence.

---

## 🧯 Error Handling

I implemented:

- React Router error boundaries `(errorElement)`

- A custom `<ErrorBoundary>` and `<ErrorFallback>` for runtime errors

---

## 📄 Vercel Deployment
To fix routing issues on Vercel (e.g., direct navigation to /todos/:id or 404s), I added this vercel.json file:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
This ensures the React Router takes over routing even after deployment.

---

## 🖼️ Screenshots

![Todo App Screenshot](/public/assets/screenshot.png)

---

## 🐞 Known Issues / Limitations

- No real authentication (planned)
- No real backend (planned)
- Todos are lost if localStorage is cleared
- No drag-and-drop sorting yet

---

## 📌 Todos

- [x] Pagination
- [x] Search & Filter
- [x] LocalStorage Persistence
- [x] CRUD (Create, Read, Update, Delete)
- [x] State Management with Zustand
- [x] Error Handling
- [x] Dark/Light Theme Toggle
- [ ] Real Authentication (Planned)
- [ ] Real Backend (Planned)

---

## 🧠 Future Improvements

- Add login/register with JWT
- Store todos to database (e.g., Firebase, Supabase, or custom API)
- Add drag-and-drop sorting
- Add collaborative features
- Add tests and CI/CD

---

## 👤 Author

**👨‍💻 Agbor Reuben Gift**

**🎓 About Me**

I'm a frontend developer in training at AltSchool Africa. This project is part of my continuous learning journey in React, state management, and building real apps. I love building beautiful interfaces and exploring tools that make frontend development smoother.

- GitHub: [@Reuben-10](https://github.com/Reuben-10)
- Tech Stack: React, Zustand, Tailwind CSS, TanStack Query
- AltSchool Africa

---