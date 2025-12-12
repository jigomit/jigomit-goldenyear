# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Golden Years Care Home - a senior care facility website built with Laravel 12, Inertia.js v2, Vue 3, and Tailwind CSS v4.

## Development Commands

```bash
# Start development server (Laravel + Vite + Queue + Logs)
composer run dev

# Build frontend assets
npm run build

# Run tests
php artisan test
php artisan test --filter=testName           # Single test
php artisan test tests/Feature/ExampleTest.php  # Single file

# Code formatting
vendor/bin/pint --dirty                      # PHP (run before commits)
npm run lint                                 # ESLint for Vue/TS
npm run format                               # Prettier

# Generate Wayfinder routes (after route changes)
php artisan wayfinder:generate
```

## Architecture

### Backend (Laravel 12)
- **Routes**: `routes/web.php` - Inertia routes returning Vue pages
- **Middleware**: Configured in `bootstrap/app.php` (Laravel 12 structure - no separate middleware files)
- **Pages**: Rendered via `Inertia::render('PageName')` from route closures

### Frontend (Dual Setup)
This project has two frontend configurations:

1. **Inertia + Laravel** (primary):
   - Entry: `resources/js/app.ts`
   - Pages: `resources/js/pages/*.vue`
   - Layout: `resources/js/layouts/MainLayout.vue`
   - CSS: `resources/css/app.css`

2. **Standalone Vue SPA** (in `src/`):
   - Entry: `src/main.ts`
   - Uses Vue Router at `src/router/index.ts`
   - Vite config points `@` alias to `./src`

### Styling (Tailwind v4)
- CSS-first configuration using `@theme` directive in `resources/css/app.css`
- Custom color palette: `--color-primary`, `--color-secondary`, `--color-warm-white`, etc.
- Custom CSS classes: `.btn-primary`, `.btn-secondary`, `.card-hover`, `.fade-up`, etc.
- Use `gap` utilities for spacing (not margins)

## Key Conventions

### PHP
- Use PHP 8 constructor property promotion
- Always include return type declarations
- Create Form Request classes for validation (not inline)
- Prefer `Model::query()` over `DB::`

### Vue/TypeScript
- Use `<Link>` from `@inertiajs/vue3` for navigation
- Build forms with `useForm` helper
- Use Wayfinder for type-safe route functions: `import { show } from '@/actions/...'`

### Testing (Pest v4)
- Create tests with `php artisan make:test --pest {name}`
- Use datasets for validation rule tests
- Browser tests go in `tests/Browser/`
