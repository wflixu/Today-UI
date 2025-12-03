# Repository Guidelines

## Project Structure & Module Organization

Today-UI is a Vue 3 component library focused on popup elements (tooltips, dropdowns, menus, modals) built with Fluent Design principles.

- `src/` - Main source code organized by component:
  - `button/`, `dialog/`, `dropdown/`, `file-tree/`, `menu/`, `tabs/`, `toast/`, `tooltip/` - Component directories
  - `shared/` - Shared utilities and types
  - `assets/` - Static assets and styles
  - `index.ts` - Main entry point exporting all components
- `specs/` - Component specifications
- `dist/` - Build output (generated)
- `public/` - Documentation assets and logos

## Build, Test, and Development Commands

- `pnpm dev` - Start Histoire development server for component documentation
- `pnpm build` - Full build: Vite + TypeScript compilation + API extraction
- `pnpm test:unit` - Run Vitest unit tests with jsdom environment
- `pnpm typecheck` - Type checking for test files
- `pnpm lint` - ESLint with auto-fix for all source files
- `pnpm doc` - Build Histoire documentation
- `pnpm preview` - Preview built documentation on port 5050

## Coding Style & Naming Conventions

**Linting & Formatting:**
- Uses ESLint with Airbnb + Vue 3 + TypeScript + Prettier configuration
- `.eslintrc` extends: `plugin:@typescript-eslint/recommended`, `eslint-config-airbnb-base`, `plugin:vue/vue3-recommended`

**Component Naming:**
- Component directories: kebab-case (e.g., `file-tree`, `dropdown`)
- Vue components: PascalCase (e.g., `FileTree`, `Dropdown`)
- Template component usage: kebab-case (e.g., `<t-tooltip>`, `<t-dropdown>`)

**Code Style:**
- TypeScript for all components
- Vue 3 Composition API preferred
- 2-space indentation (enforced by ESLint)
- Console statements: only `info`, `warn`, `error` allowed

## Testing Guidelines

**Framework:** Vitest with jsdom environment
**Test Files:** Place `*.test.ts` or `*.spec.ts` files alongside components
**Commands:** `pnpm test:unit` to run tests, `pnpm typecheck` for type validation

**Current Status:** Test infrastructure configured but component tests not yet implemented (listed as TODO in README)

## Commit & Pull Request Guidelines

**Commit Pattern:** `type: description` format
- Recent examples: `chore:use speckit`, `chore:button`, `doc:add logo`
- Types: `chore` (maintenance), `doc` (documentation), feature-specific labels

**Development Workflow:**
- Use pnpm as package manager
- Follow semantic versioning for releases
- Component additions should update `src/components.ts` and main `src/index.ts`
- API documentation generated via `@microsoft/api-extractor`

## Agent-Specific Instructions

**Component Development:**
- Each component in its own directory under `src/`
- Export through `src/components.ts` then `src/index.ts`
- Follow Fluent Design patterns for styling
- Use `@floating-ui/vue` for positioning logic

**Build Requirements:**
- Full build required for releases: includes Vite bundling, TypeScript compilation, and API extraction
- Type definitions auto-generated in `dist/`
- CSS styles bundled in `dist/style.css`

**Documentation:**
- Histoire used for component documentation and demos
- Component stories in `.histoire/` setup
- Documentation builds to static site for deployment
