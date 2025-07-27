# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run Jest tests (UTC timezone)
```

### Database

```bash
npm run pull-env     # Sync environment from Vercel
npm run pull-types   # Generate TypeScript types from Supabase schema
```

## Architecture

### Tech Stack

- **Next.js 15.2.0** with App Router and Server Components
- **Supabase** for authentication and PostgreSQL database
- **TanStack React Query** for server state management
- **React Hook Form + Zod** for form handling and validation
- **CSS Modules** for component styling.

### Code Organization

Feature-based architecture with clear separation:

- `src/features/` - Domain-specific components and logic
- `src/lib/api/db/` - Database queries split by client/server
- `src/app/` - Next.js App Router pages

### Database Patterns

**Query Key Pattern**: Functions have attached `getQueryKey()` method

```typescript
export const getAllUserWorkouts = async (client: TypedSupabaseClient) => {
  /* ... */
};
getAllUserWorkouts.getQueryKey = () => ['getAllUserWorkouts'];
```

**DTO Mapping**: Database types mapped to domain types

```typescript
export function mapWorkoutDTOToWorkout(workout: WorkoutDTO): Workout {
  return { id: workout.id, name: workout.name };
}
```

**Client/Server Split**:

- `queries/client.ts` - Browser-side React Query hooks
- `queries/server.ts` - Server-side data fetching with caching

### Authentication Flow

- Middleware-based session management at app level
- Automatic redirects for unauthenticated users
- User state passed down through layout components
- Row Level Security (RLS) enforced at database level

### State Management

- **Server State**: React Query with 60s staleTime
- **Local State**: React Hook Form for forms, localStorage for workout sessions
- **Session State**: Active workout tracking with 12-hour expiration

### Component Patterns

- Compound components with barrel exports (`index.tsx`)
- CSS Modules with consistent naming (`component.module.css`), following rscss from https://ricostacruz.com/rscss/index.html
- Props interfaces with optional `className`
- Form components use forwardRef for React Hook Form integration

### Error Handling

Use `failSafely` utility for promise error handling:

```typescript
const { data, error } = await failSafely(someAsyncOperation());
```

### Key Features

- **Workout Templates**: Reusable workout plans
- **Active Workouts**: Session-based tracking with localStorage persistence
- **Exercise Library**: User and system exercises via database views
- **Set Logging**: Reps and weight tracking

### Database Integration

- Generated TypeScript types from Supabase schema
- Custom database views (e.g., `user_visible_exercises`)
- RPC calls for complex operations: `supabase.rpc('create_workout', data)`

### Testing

- Jest with jsdom environment
- UTC timezone enforcement for consistent date tests
- Focus on utility functions and critical paths

### CSS Styling

- Using `rem` over pixels most of the time, according to https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility
- Variants are NOT prefixed by a dash (`&.small` instead of `&.-small`)
- Class names are camel case
- Parent class name will always be `.container`
- Use clsx to combine class names
