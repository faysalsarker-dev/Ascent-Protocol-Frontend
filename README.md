# AURA Fitness Frontend

Next.js + TypeScript frontend for the Ascent Protocall Fitness workout planning and tracking API.  
It covers authentication, workout plan management, day/exercise planning, active workout sessions, and exercise history.

---

## 🚀 Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- TailwindCSS v4 (utility-first styling)
- SWR (data fetching/cache)
- Framer Motion (animations)
- Sonner (toast notifications)

---

## ⚙️ Requirements

- Node.js 18+
- npm (included with Node) or pnpm/yarn/bun
- Running backend API that implements the workout endpoints described in `src/services/workout/workout.service.ts`

---

## 🔐 Environment Variables

Create a `.env.local` file with your API base URL:

```bash
NEXT_PUBLIC_BASE_API_URL=http://localhost:5000/api
```

> This value must point to the backend documented in the workout API doc.

---

## 📦 Setup

```bash
# install deps
npm install

# run development server
npm run dev
```

Open http://localhost:3000 to use the app.

---

## 🧭 App Structure

| Section | Path | Description |
| --- | --- | --- |
| Auth | `/login`, `/register` | Email + password login/register with cookie storage |
| Workout dashboard | `/user/workout` | Manage plans, see active plan, see today's workout |
| Active workout | `/user/workout/active` | Live session tracking, add sets, complete workout |

Key directories:

- `src/services/workout` – client-side API wrappers for every endpoint.
- `src/hooks/use-workout.ts` – SWR hooks (fetch + mutate + toasts).
- `src/components/modules/workout` – UI building blocks (cards, dialogs, active session UI).
- `src/types/workout.d.ts` – TypeScript models for everything returned/posted to the API.

---

## 💡 Usage Flow

1. **Log in / Register**  
   Head to `/login` (or `/register`) and authenticate. Tokens are stored in cookies.

2. **Create a workout plan**  
   - Go to `/user/workout` → “Create Plan”.
   - Activate any plan to make it your current routine.

3. **Add workout days & exercises**  
   - Active plan tab lists all days. You can add days and exercises via the dialogs (or extend the UI as needed).

4. **Start a workout**  
   - In “Active Plan” or “Today’s Workout”, click “Start Workout”.
   - You’re redirected to `/user/workout/active`.

5. **Log exercise sets**  
   - Use “Add Set” to log reps, weight, form, etc.
   - Sets are grouped per exercise. Personal records show automatically.

6. **Complete workout**  
   - Click “Complete Workout” once done.
   - Provide mood/energy notes → XP and stats update.

---

## 🧪 Helpful Scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run start      # run production build
npm run lint       # type + lint check
```

---

## 🧱 Extending the UI

- Add new pages under `src/app/(userLayout)/user/workout/**`.
- Reuse SWR hooks (e.g., `useWorkoutPlans`, `useWorkoutSessions`) for data access.
- Import service functions directly if you need custom flows.
- Animations: wrap sections in `<motion.div>` (Framer Motion already installed).

---

## 🤝 Tips

- The frontend expects cookies `accessToken` and `refreshToken` to be issued by the backend.
- All API request URLs come from `NEXT_PUBLIC_BASE_API_URL`.
- SWR automatically revalidates after mutations; call `mutate()` for manual refresh.
- Review `src/services/workout/workout.service.ts` for all available operations.

Happy training! 💪
