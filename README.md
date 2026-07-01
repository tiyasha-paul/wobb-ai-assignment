# Wobb Frontend Assignment

A starter influencer search application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. This project is intentionally left in a rough-but-working state for candidates to improve.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## What's Included

- **Search / Dashboard** — filter influencers by platform (Instagram, YouTube, TikTok) and search by username or full name
- **Profile Details** — click a profile to view extended data loaded from individual JSON files
- **Routing** — `react-router-dom` with `/` (search) and `/profile/:username` (details)

Sample data lives in:

- `src/assets/data/search/` — platform search results (10 profiles each)
- `src/assets/data/profiles/` — detailed profile JSON per username

## How to Submit

1. **Download or clone** this starter project to your machine.
2. **Create a new repository** on your own GitHub account. Do not fork the original assignment repo — push your work to a repo you own.
3. Complete the tasks below and push your changes to that repository.
4. **Share the public GitHub repository URL** with us as your submission.

### Deadline (strict)

- **Due:** **2 July 2026, 2:00 PM IST** (Indian Standard Time, UTC+5:30)
- **Any git commits made after this deadline will disqualify your submission.** We will only consider the repository state as of the deadline; late commits will not be reviewed.
- Make sure your final work is pushed **before** the cutoff.

## AI Usage

You may use any AI tools (Cursor, ChatGPT, Claude, GitHub Copilot, etc.). We are evaluating your final solution and engineering decisions.

## Your Tasks

Complete the following as part of your submission:

1. **Find and fix all bugs and quality issues** — the codebase contains intentional bugs and quality issues. Identify and resolve them.

2. **Completely redesign the UI/UX** — replace the basic layout with a polished, modern interface. Focus on usability, visual hierarchy, and delight.

3. **Replace React Context with Zustand** — when you implement state management for the selected list, use [Zustand](https://github.com/pmndrs/zustand) instead of React Context.

4. **Implement "Select profile & Add to List"** — the disabled "Add to List" button is a stub. Build the full feature:
   - Select / add profiles to a persistent list
   - View and manage the selected list
   - Handle duplicates appropriately

5. **Improve code quality and project structure** — refactor as needed, add proper types, and follow React best practices.

6. **Optimize performance** — apply sensible optimizations where appropriate.

7. **Use any libraries you need** — you are not limited to the current stack. Choose tools that help you deliver a great result (UI kits, state managers, testing libraries, etc.).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run lint` | Run ESLint               |

## Submission Notes

- Document any assumptions or trade-offs in your README
- Ensure `npm run build` passes before submitting
- Focus on demonstrating your judgment — not every possible feature needs to be built, but the core assignment items should be addressed thoughtfully
- Double-check that your repo is public (or that we have access) and that the link is included in your submission
- Please make meaningful commits throughout your work. We may review your commit history.
- **Bonus:** Deploying the app (e.g. Vercel, Netlify, GitHub Pages) is optional but will be considered a plus — include the live URL in your submission if you do

Good luck!

## Changelog

### Task 1 — Fix existing bugs
- Fixed case-sensitive username search in `filterProfiles()` — both username and fullname now match case-insensitively.
- Fixed engagement rate bug: `ProfileDetailPage` used `rate * 10000` (wrong); now uses shared `formatEngagementRate()` (`rate * 100`).
- Consolidated dead `SearchBar.tsx` — refactored `PlatformFilter` to import and use `SearchBar` instead of inline input.
- Removed duplicate `formatFollowersLocal()` / `formatFollowersDetail()` — all components now use shared `formatFollowers()` from `formatters.ts`.
- Added `alt` attributes to all `<img>` tags (`alt={profile.fullname}`).
- Removed unused `react-beautiful-dnd` (incompatible with React 19, unmaintained).
- Noted `w-[700px]` responsiveness issue in `ProfileCard` — to be fixed in Task 5.

### Task 2 — Zustand store for saved/list profiles
- Created `src/store/useListStore.ts` with Zustand + `persist` middleware.
- State holds an array of `SavedProfile` objects (user_id, username, fullname, picture, followers, platform, is_verified).
- Actions: `addProfile` (deduplicates by user_id), `removeProfile`, `isInList`.
- Persisted to localStorage under key `wobb-saved-profiles` so the list survives page refresh.

### Task 3 — Wire up Add to List feature end-to-end
- Updated `ProfileCard` and `ProfileDetailPage` buttons to dispatch `addProfile` / `removeProfile` actions.
- Added visual toggle state (`Add to List` vs `Added ✓`).
- Created `ListPage.tsx` at `/list` route displaying saved profiles with a remove button and an empty state.
- Updated `Layout.tsx` header with a link to the `/list` page and a badge showing the number of saved items.
- Registered `/list` route in `App.tsx`.

### Task 4 — Code quality pass
- Removed unnecessary `clickCount` state and console logging from `SearchPage.tsx`.
- Removed unused `onProfileClick` prop and logic from `SearchPage.tsx`, `ProfileList.tsx`, and `ProfileCard.tsx` as it was only used for logging.
- Verified TypeScript types and project folder structure.

### Task 5 — UI/UX redesign
- Implemented a completely new modern, clean design utilizing the provided color palette (`#BE1A1A`, `#D0311E`, `#F7D87F`, `#F8EBAB`).
- Upgraded `index.css` by utilizing Tailwind CSS v4 `@theme` configuration and standardizing typography to modern sans-serif.
- **Layout & Navigation:** Added a sticky header with brand-colored navigation links and an integrated "Saved List" counter badge.
- **Responsive Grids:** Converted fixed-width `ProfileCard` items into a responsive CSS grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) within `ProfileList.tsx` and `ListPage.tsx`.
- **Card Design:** Overhauled `ProfileCard.tsx` with smooth hover transitions, box shadows, and an elegant rounded UI structure. 
- **Accessibility:** Ensured distinct `focus-visible:ring-2` focus rings across interactive elements like buttons and cards for proper keyboard navigation.
- **Enhanced Detail Page:** Redesigned `ProfileDetailPage.tsx` to include an avatar overlapping a cover gradient banner and reorganized stats into a clean metrics grid.
- **Empty & Loading States:** Created polished, friendly empty state messages for search results and the list page, avoiding bare text screens. Added modern loading skeletons/spinners for `ProfileDetailPage`.

### Task 7 — Performance & extras
- **Memoization:** Wrapped `ProfileCard` in `React.memo` to prevent unnecessary re-renders of the entire list when a single card interacts with the Zustand store.

## Libraries Added
- **`zustand`**: Chosen as the state management library for the "Saved List" feature. Justification: It provides a lightweight, boilerplate-free way to manage global state compared to React Context or Redux. Its built-in `persist` middleware made implementing `localStorage` persistence trivial.

## Assumptions Made
- **Routing structure**: Assumed that keeping the `?platform=...` query parameter when navigating to a profile detail page was the intended way to persist the platform context, as it's cleaner than passing it through global state for a simple read-only view.
- **Empty state behavior**: Assumed that if a user deletes all saved profiles from the list, they should see a friendly empty state with a call-to-action to return to the search page.
- **Data immutability**: Assumed the provided JSON data should remain read-only. We are not implementing any backend modifications or profile updates.

## Trade-offs
- **Performance vs Feature richness**: Prioritized building a robust, responsive UI and a solid global state architecture over implementing advanced performance techniques like virtualized lists. Given the small mock dataset (10 profiles per platform), virtualization would introduce unnecessary complexity without noticeable gains.
- **Custom CSS vs Animation Libraries**: Decided against adding libraries like Framer Motion to keep the bundle size small and adhere to the "Keep it simple" constraint. Instead, utilized Tailwind CSS transition utilities for smooth, performant micro-interactions.

## Remaining Improvements (With More Time)
- **Unit and Integration Testing**: Implement tests using Vitest and React Testing Library to cover the Zustand store logic and critical UI components.
- **Virtualization**: If the dataset were to grow significantly (e.g., hundreds of influencers), I would implement `react-window` or `@tanstack/react-virtual` for the `ProfileList` to ensure smooth scrolling.
- **Deployment & CI/CD**: Set up a GitHub Actions workflow to automatically run the linting and build steps, and deploy the application to Vercel or Netlify.
- **Advanced Filtering**: Add features to filter influencers by follower count ranges or engagement rate thresholds.
