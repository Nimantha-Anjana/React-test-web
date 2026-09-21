# Serenity Grand Hotel

```
React-test-web/
├── backend/    Node.js + Express + MongoDB (Mongoose) API
└── frontend/   React + Vite (public website AND admin panel)
    └── src/
        ├── admin/   admin panel   -> /admin, /admin/rooms, /admin/bookings ...
        ├── web/     public site   -> /, /rooms, /dining, /gallery, /booking ...
        ├── App.jsx  router: "/admin/*" -> admin, everything else -> web
        └── main.jsx
```

## Run

Frontend
```
cd frontend
npm install
npm run dev        # http://localhost:5173  (admin at /admin)
```

Backend (needs MongoDB running)
```
cd backend
npm install
# edit .env (MONGO_URI, ADMIN_API_KEY)
npm run dev        # http://localhost:5000/api/health
```

## API

| Route | Public | Admin only |
|---|---|---|
| `/api/rooms`, `/api/gallery`, `/api/services` | GET | POST, PUT, DELETE |
| `/api/dining/restaurants`, `/api/dining/menu` | GET | POST, PUT, DELETE |
| `/api/bookings` | POST | GET, PUT, DELETE |
| `/api/messages` | POST | GET, PUT, DELETE |
| `/api/customers` | - | everything |

Admin-only routes need the header `x-admin-key: <ADMIN_API_KEY from .env>`.
Filters: `/api/gallery?status=Published`, `/api/services?status=Active`.
