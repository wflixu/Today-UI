# Data Model for Today-UI

**Date**: 2025-10-08
**Feature**: [创建一个 Vue3 组件库](spec.md)

This document defines the key data entities for the `Today-UI` component library. As this is a UI library, the "data model" primarily refers to the structure of components and their styling configuration.

## 1. Component

- **Description**: A `Component` is a self-contained, reusable piece of the user interface. Each component encapsulates its own logic, markup, and styling.
- **Key Attributes**:
    - **`props`**: An object defining the inputs the component accepts. These are strongly typed using TypeScript and align with the props of the corresponding `@fluentui/react-components` component.
        - *Validation*: Prop types, required status, and default values are enforced at the type level and, where necessary, with runtime validators.
    - **`slots`**: Named content-injection points that allow consumers to provide custom content within a component's structure (e.g., `icon`, `default`).
    - **`events`**: A set of custom events the component can emit to communicate with its parent (e.g., `@click`, `@update:modelValue`).

- **State Transitions**:
    - A component's internal state (e.g., `open`, `disabled`, `focused`) changes in response to user interaction or prop changes. These state changes trigger re-renders and apply different styles.

## 2. Design Token

- **Description**: A `Design Token` is an atomic, named variable that represents a fundamental design decision in the Fluent Design system. These tokens are used by `griffel-vue` to style components.
- **Key Attributes**:
    - **`name`**: A semantic name that describes the token's purpose (e.g., `colorBrandForeground1`, `fontSizeBase300`, `borderRadiusMedium`).
    - **`value`**: The actual CSS value of the token (e.g., `#0078d4`, `14px`, `4px`).
    - **`theme`**: Tokens are grouped by theme (e.g., `light`, `dark`), allowing for dynamic theme switching.

- **Relationships**:
    - `Components` are styled using `Design Tokens`. A single component will reference multiple design tokens for its various visual properties (color, spacing, font size, etc.).
    - `Design Tokens` are organized into themes. Changing the active theme updates the values of the tokens, which in turn updates the appearance of all components.

## 3. Griffel Style Object

- **Description**: A JavaScript object that defines the CSS rules for a component. `griffel-vue` processes this object to generate atomic CSS classes.
- **Key Attributes**:
    - **`root`**: The base styles for the component's root element.
    - **`[slotName]`**: Styles for specific parts (slots) of the component.
    - **`[state]`**: Styles that apply conditionally based on the component's state (e.g., `:hover`, `&.disabled`).

- **Relationships**:
    - Each `Component` has one or more `Griffel Style Objects` that define its appearance.
    - These style objects consume `Design Tokens` to ensure consistency with the Fluent Design system.
