# Wobb Influencer Search

A modern, responsive web application for discovering, sorting, and managing top influencers across major social platforms.

**Live Deployment:** [https://wobb-ai-assignment-sigma.vercel.app/](https://wobb-ai-assignment-sigma.vercel.app/)

## Features

- **Multi-Platform Search** — Filter top influencers across Instagram, YouTube, and TikTok.
- **Advanced Filtering & Sorting** — Search by username or full name (case-insensitive) and dynamically sort results by follower count.
- **Detailed Profiles** — View extended data, engagement rates, and custom avatars for individual influencers on dedicated profile pages.
- **Save to List** — Build a persistent shortlist of your favorite creators for upcoming campaigns.
- **Local Persistence** — Your saved list survives browser refreshes automatically.
- **Neo-Brutalist UI** — A highly polished, accessible, and responsive interface featuring a unique wavy grid background and bold, high-contrast styling.

## Tech Stack

React, TypeScript, Vite, Tailwind CSS, Zustand, React Router

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Testing

This project uses Vitest for unit testing. To run the test suite (covering the global Zustand store logic):

```bash
npm run test
```

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run lint` | Run ESLint               |

## Project Structure

- `src/assets/` — Static assets and mock JSON data for search results and detailed profiles.
- `src/components/` — Reusable UI components (`ProfileCard`, `PlatformFilter`, `Layout`, etc.).
- `src/pages/` — Main route views (`SearchPage`, `ProfileDetailPage`, `ListPage`).
- `src/store/` — Global state management (`useListStore.ts`).
- `src/types/` — TypeScript interfaces and type definitions.
- `src/utils/` — Helper functions for data formatting and filtering.

## What Was Built

### Bug Fixes
- Fixed case-sensitive username search in `filterProfiles()` — both username and fullname now match case-insensitively.
- Fixed engagement rate bug: `ProfileDetailPage` used `rate * 10000` (wrong); now uses shared `formatEngagementRate()` (`rate * 100`).
- Consolidated dead `SearchBar.tsx` — refactored `PlatformFilter` to import and use `SearchBar` instead of inline input.
- Removed duplicate `formatFollowersLocal()` / `formatFollowersDetail()` — all components now use shared `formatFollowers()` from `formatters.ts`.
- Added `alt` attributes to all `<img>` tags (`alt={profile.fullname}`).
- Removed unused `react-beautiful-dnd` (incompatible with React 19, unmaintained).

### UI/UX Redesign
- Replaced the basic layout with a completely new modern, clean Neo-Brutalist design utilizing Tailwind CSS v4 `@theme` configuration and standardizing typography to modern sans-serif.
- **Layout & Navigation:** Added a sticky header with brand-colored navigation links and an integrated "Saved List" counter badge. Implemented a seamless SVG wavy grid background.
- **Responsive Grids:** Converted fixed-width `ProfileCard` items into a responsive CSS grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) within `ProfileList.tsx` and `ListPage.tsx`.
- **Card Design:** Overhauled `ProfileCard.tsx` with smooth hover transitions, box shadows, and an elegant rounded UI structure. 
- **Accessibility:** Ensured distinct `focus-visible:ring-2` focus rings across interactive elements like buttons and cards for proper keyboard navigation.
- **Enhanced Detail Page:** Redesigned `ProfileDetailPage.tsx` to include an avatar overlapping a cover gradient banner and reorganized stats into a clean metrics grid.
- **Empty & Loading States:** Created polished, friendly empty state messages for search results and the list page, avoiding bare text screens. Added modern loading skeletons/spinners for `ProfileDetailPage`.

### State Management
- Created `src/store/useListStore.ts` with Zustand + `persist` middleware.
- State holds an array of `SavedProfile` objects (user_id, username, fullname, picture, followers, platform, is_verified).
- Actions: `addProfile` (deduplicates by user_id), `removeProfile`, `isInList`.
- Persisted to localStorage under key `wobb-saved-profiles` so the list survives page refresh.

### Add to List Feature
- Updated `ProfileCard` and `ProfileDetailPage` buttons to dispatch `addProfile` / `removeProfile` actions.
- Added visual toggle state (`Add to List` vs `Added ✓`).
- Created `ListPage.tsx` at `/list` route displaying saved profiles with a remove button and an empty state.
- Updated `Layout.tsx` header with a link to the `/list` page and a badge showing the number of saved items.
- Registered `/list` route in `App.tsx`.

### Performance Optimizations
- **Component Memoization:** Wrapped `ProfileCard` in `React.memo` to prevent unnecessary re-renders of the entire list when a single card interacts with the Zustand store.
- **Stable References:** Wrapped `handlePlatformChange` and `handleSearchChange` in `SearchPage.tsx` with `useCallback` so their references stay stable across renders. This ensures memoized child components (`PlatformFilter`, `ProfileCard`) aren't needlessly re-rendered.
- **Derived Data:** Memoized `extractProfiles` and `filterProfiles` with `useMemo` so that filtering calculations only rerun when their dependencies (`platform`, `searchQuery`) actually change.
- **Checked Prop Chains:** Verified that no inline arrow functions are passed from `ProfileList.tsx` or `ListPage.tsx` directly into the memoized `ProfileCard`.
- **Zustand Stability:** Confirmed that Zustand's store actions (`addProfile`, `removeProfile`, `isInList`) are inherently stable by default and do not break memoization boundaries.

### Reliability
- **Error Boundary:** Implemented a top-level React Error Boundary with a friendly, neo-brutalist fallback UI to gracefully handle any unexpected rendering errors without crashing the entire app.
- **Continuous Integration:** Set up a GitHub Actions workflow to automatically run tests, linting, and build validation on every push and pull request to the `main` branch.

## Libraries Added
- **`zustand`**: Chosen as the state management library for the "Saved List" feature. Justification: It provides a lightweight, boilerplate-free way to manage global state compared to React Context or Redux. Its built-in `persist` middleware made implementing `localStorage` persistence trivial.

## Assumptions Made
- **Routing structure**: Assumed that keeping the `?platform=...` query parameter when navigating to a profile detail page was the intended way to persist the platform context, as it's cleaner than passing it through global state for a simple read-only view.
- **Empty state behavior**: Assumed that if a user deletes all saved profiles from the list, they should see a friendly empty state with a call-to-action to return to the search page.
- **Data immutability**: Assumed the provided JSON data should remain read-only. We are not implementing any backend modifications or profile updates.

## Trade-offs
- **Performance vs Feature richness**: Prioritized building a robust, responsive UI and a solid global state architecture over implementing advanced performance techniques like virtualized lists. Given the small mock dataset (10 profiles per platform), virtualization would introduce unnecessary complexity without noticeable gains.
- **Custom CSS vs Animation Libraries**: Decided against adding libraries like Framer Motion to keep the bundle size small and adhere to the "Keep it simple" constraint. Instead, utilized Tailwind CSS transition utilities for smooth, performant micro-interactions.

## Remaining Improvements
- **Virtualization**: If the dataset were to grow significantly (e.g., hundreds of influencers), I would implement `react-window` or `@tanstack/react-virtual` for the `ProfileList` to ensure smooth scrolling.