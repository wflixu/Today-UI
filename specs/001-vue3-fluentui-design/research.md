# Research for Today-UI Component Library

**Date**: 2025-10-08
**Feature**: [创建一个 Vue3 组件库](spec.md)

This document outlines the research and decisions made to resolve technical uncertainties for the `Today-UI` project.

## 1. Build Tooling: Vite + tsdown

- **Decision**: Use `Vite` for development and `tsdown` for production builds.
- **Rationale**:
    - `Vite` provides an extremely fast development server with Hot Module Replacement (HMR), which is ideal for component development and documentation with Histoire.
    - `tsdown` is a specialized build tool optimized for creating dual ESM/CJS packages from TypeScript source. It simplifies the build configuration, handles type declaration generation, and ensures the final package is tree-shakeable and compatible with various consumption environments. This is crucial for a component library.
- **Alternatives considered**:
    - **Vite Library Mode**: While capable, it requires more manual configuration to handle dual formats and type declarations correctly compared to `tsdown`.
    - **Rollup**: `tsdown` uses Rollup internally, but abstracts away much of the boilerplate, making it a more streamlined choice.

## 2. Component Documentation and Testing: Histoire

- **Decision**: Use `Histoire` for component documentation, visual testing, and interaction testing.
- **Rationale**:
    - `Histoire` is a modern, Vite-native tool designed specifically for component stories in the Vue ecosystem.
    - It offers a great developer experience, fast setup, and powerful features like controls, variants, and responsive testing, which are essential for developing a high-quality component library.
    - It serves as both a documentation site and a testing ground, aligning with the project's need for efficiency.
- **Alternatives considered**:
    - **Storybook**: While a powerful and popular choice, its setup with Vite can sometimes be more complex. Histoire's native integration with Vite makes it a more seamless fit for this project.

## 3. CSS-in-JS Framework: griffel-vue

- **Decision**: Use `griffel-vue` for all component styling.
- **Rationale**:
    - The project's goal is to be a Vue-based transcription of `@fluentui/react-components`, which uses `@griffel/react`. Using `griffel-vue` (a direct port) is the most direct path to achieving style compatibility.
    - Griffel's atomic CSS approach provides excellent performance by generating highly optimized, minimal CSS at build time and runtime. It integrates well with design tokens, which is a core part of Fluent UI.
- **Alternatives considered**:
    - **Styled Components / Emotion**: These are popular but have different APIs and paradigms. Sticking with a Griffel-like library minimizes the translation effort from the React source.
    - **Tailwind CSS**: While excellent for utility-first styling, it doesn't align with the CSS-in-JS approach used by the original Fluent UI library and would require a complete rethinking of the styling architecture.
