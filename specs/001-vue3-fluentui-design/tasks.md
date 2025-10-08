# Tasks: 创建一个 Vue3 组件库 - Button 组件

**Input**: Design documents from `/Users/lixu/code/Today-UI/specs/001-vue3-fluentui-design/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: 规格说明中明确要求了测试，因此将包含测试任务。

**Organization**: 任务按用户故事（User Story）组织，以实现独立实现和测试。

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 项目初始化和基础结构设置。

- [ ] T001 [P] [Setup] 在 `src/style/` 目录下创建基础样式文件 `base.css` 和设计令牌 `token.json`。
- [ ] T002 [P] [Setup] 在 `src/shared/` 目录下创建共享工具函数，例如 `bem.ts` (BEM class generator) 和 `withInstall.ts` (for Vue plugin installation)。
- [ ] T003 [P] [Setup] 配置 `histoire.setup.ts` 以加载全局样式和 `FluentProvider`。

---

## Phase 2: Foundational (Blocking Prerequisites for Button)

**Purpose**: `Button` 组件自身的核心结构，必须在实现具体用户故事之前完成。

- [ ] T004 [Foundational] 在 `src/button/` 目录下创建 `Button` 组件的目录结构。
- [ ] T005 [P] [Foundational] 在 `src/button/props.ts` 中定义 `Button` 组件的 props，与 `@fluentui/react-components` 的 `Button` 对齐。
- [ ] T006 [P] [Foundational] 在 `src/button/Button.types.ts` 中定义 `Button` 组件所需的状态和插槽类型。
- [ ] T007 [Foundational] 在 `src/button/ButtonContext.ts` 中创建 Button 的上下文（Context），用于在父子组件间共享状态。

**Checkpoint**: `Button` 组件的基础框架已准备就绪，可以开始实现具体的用户故事。

---

## Phase 3: User Story 1 - 基础组件实现 (Priority: P1) 🎯 MVP

**Goal**: 实现一个功能齐全、样式正确的 `Button` 组件。

**Independent Test**: 在 Histoire 中可以独立渲染一个 `Button`，验证其外观、交互和事件是否符合预期。

### Tests for User Story 1 ⚠️

**NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T008 [P] [US1] 在 `src/button/Button.story.vue` 中为 `Button` 组件创建一个基础的 story，用于展示其默认状态。
- [ ] T009 [P] [US1] 使用 `vitest` 在 `src/button/tests/Button.spec.ts` 中编写一个单元测试，断言组件能够被成功渲染。

### Implementation for User Story 1

- [ ] T010 [US1] 在 `src/button/useButtonStyles.styles.ts` 中，使用 `griffel-vue` 定义 `Button` 的基础样式和不同 `appearance` (primary, secondary, etc.) 下的样式。
- [ ] T011 [US1] 在 `src/button/useButton.ts` 中创建一个 composition function，用于处理 `Button` 的 props，并返回传递给视图的 slot props 和状态。
- [ ] T012 [US1] 在 `src/button/Button.tsx` 中实现 `Button` 组件的核心逻辑。使用 `useButton` 和 `useButtonStyles`，并正确渲染 `slots` 和处理 `onClick` 事件。
- [ ] T013 [US1] 在 `src/button/index.ts` 中导出 `Button` 组件及其相关类型，并使用 `withInstall` 使其能够作为 Vue 插件安装。

**Checkpoint**: `Button` 组件现在应功能齐全，并通过了 US1 的所有验收标准。

---

## Phase 4: User Story 2 - 组件 API 对齐 (Priority: P2)

**Goal**: 确保 `Button` 组件的 API 与 `@fluentui/react-components` 高度兼容。

**Independent Test**: 在 Histoire 中，通过 Controls 面板动态修改 props (如 `shape`, `size`, `disabled`)，验证组件表现是否与 React 版本一致。

### Tests for User Story 2 ⚠️

- [ ] T014 [P] [US2] 在 `src/button/Button.story.vue` 中添加更多的 stories，覆盖不同的 `shape`, `size`, 和 `disabled` 状态。
- [ ] T015 [P] [US2] 在 `src/button/tests/Button.spec.ts` 中添加测试用例，验证 `disabled` prop 能否正确禁用按钮的点击事件。

### Implementation for User Story 2

- [ ] T016 [US2] 在 `src/button/props.ts` 中补充 `shape`, `size`, `disabled`, `iconPosition` 等 props。
- [ ] T017 [US2] 在 `src/button/useButtonStyles.styles.ts` 中为新增的 props (e.g., `circular`, `square`, `small`, `large`) 添加对应的样式。
- [ ] T018 [US2] 在 `src/button/useButton.ts` 和 `Button.tsx` 中更新逻辑，以处理 `disabled` 状态和 `iconPosition`。

**Checkpoint**: `Button` 组件的 API 已经与 Fluent UI React 版本高度对齐。

---

## Phase 5: User Story 3 - CSS-in-JS 样式方案 (Priority: P3)

**Goal**: 验证并确保所有样式均由 `griffel-vue` 正确生成和应用。

**Independent Test**: 在浏览器开发者工具中检查渲染出的 `Button` 组件，确认其 class 是由 Griffel 生成的原子化 CSS 类名，并且样式变量能够正确应用。

### Tests for User Story 3 ⚠️

- [ ] T019 [P] [US3] 在 `src/button/tests/Button.spec.ts` 中添加快照测试，以捕获组件渲染后的 DOM 结构，确保 class 名称的稳定性。

### Implementation for User Story 3

- [ ] T020 [US3] 审查 `useButtonStyles.styles.ts` 中的所有样式定义，确保它们都使用了设计令牌（`token.json`）而非硬编码的值。
- [ ] T021 [US3] 在 `histoire.setup.ts` 中实现一个简单的主题切换器，验证 `Button` 组件的样式能否在亮/暗主题间平滑过渡。

**Checkpoint**: `Button` 组件的样式实现已完全符合项目的 CSS-in-JS 架构。

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 最终的文档、清理和优化。

- [ ] T022 [P] [Polish] 为 `Button` 组件的所有 props 在 `props.ts` 中添加详细的 JSDoc 注释。
- [ ] T023 [Polish] 审查 `Button` 组件的无障碍（a11y）属性，确保 `aria-disabled` 等属性被正确应用。
- [ ] T024 [Polish] 运行 `quickstart.md` 中的示例代码，确保其能正常工作。

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 可立即开始。
- **Foundational (Phase 2)**: 依赖于 **Setup** 完成。
- **User Stories (Phase 3-5)**: 依赖于 **Foundational** 完成。
- **Polish (Phase 6)**: 依赖于所有用户故事完成。

### User Story Dependencies

- **US1, US2, US3** 均依赖于 **Foundational** 阶段的完成。理论上，在 Foundational 完成后，这三个用户故事的实现可以并行，但建议按优先级顺序进行以确保 MVP 优先交付。

### Parallel Opportunities

- **Setup** 阶段的任务 (T001-T003) 可以并行。
- **Foundational** 阶段的任务 (T005-T007) 可以并行。
- 每个用户故事的 **测试任务** (e.g., T008, T009) 可以并行。
- 在 **US2** 中，`props.ts` 和样式文件的修改可以与测试用例的编写并行。

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1.  完成 **Phase 1: Setup**。
2.  完成 **Phase 2: Foundational**。
3.  完成 **Phase 3: User Story 1** 的所有任务。
4.  **停止并验证**: 此时应有一个可用的、核心功能完备的 `Button` 组件。

### Incremental Delivery

1.  完成 MVP。
2.  继续完成 **Phase 4 (US2)**，为组件添加更多 API 兼容性。
3.  完成 **Phase 5 (US3)**，确保样式系统稳健。
4.  最后执行 **Phase 6 (Polish)** 进行完善。
