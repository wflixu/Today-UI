# specs/ — 文档索引

本目录存放 Today-UI 的设计与规范文档。

## 权威文档

改动代码前应先看这里。这三份描述的是**当前有效**的约定，与代码保持一致。

| 文档 | 回答什么问题 | 何时该改 |
|------|--------------|----------|
| **[component-roadmap.md](component-roadmap.md)** | 开发哪些组件？优先级如何？ | 组件状态变化、优先级调整时 |
| **[style.md](style.md)** | 样式与主题架构：分层、令牌、主题、覆盖接口 | 样式方案变化时 |
| **[testing-guidelines.md](testing-guidelines.md)** | 单元测试怎么写？覆盖率要求？ | 测试规范变化时 |

## 参考资料

| 文档 | 定位 |
|------|------|
| **[design-token.md](design-token.md)** | Design Token 概念、Fluent 令牌体系，以及**上游** `@fluentui/react-components` 如何落地（含 Griffel / `FluentProvider` 机制）。理解上游行为用，**不是本项目的实现方案** |

## 项目根目录的文档

- **[../README.md](../README.md) — 面向使用者的说明（安装、组件列表、主题 API）
- **[../CLAUDE.md](../CLAUDE.md) — 面向开发者的约定（组件结构、命名、注册点、测试要求）

## 已删除的文档（2026-09-19 整理）

以下文档描述的是**已废弃的方案**，保留只会制造不一致，故删除。若需追溯，从 git 历史恢复。

| 删除的文件 | 为何删除 |
|---|---|
| `1.background.rules.md` | 早期对话片段的堆叠，前半部分基于 `griffel-vue` 方案，已废弃；末尾提出的「改用 CSS 变量」决策已记入 `style.md` 的迁移历史 |
| `SCRIPTS.md` | 记录了 3 个**不存在**的命令（`build:lib`、`build:types`、`test:ui`），并把 `build` 描述为「Vite 库构建」（实际是 tsdown）。`package.json` 才是权威 |
| `button-implementation-summary.md` | 引用了一批**不存在**的文件（`button.styles.ts`、`useButtonStyles.styles.ts`、`useSpinnerStyles.ts`）；**鼓吹 ARIA 支持**，与「本项目不实现无障碍」的规范直接冲突；文件路径全错 |
| `001-vue3-fluentui-design/`（7 个文件） | 2025-10 的原始设计文档，技术方案基于 `griffel-vue`。该方案已被推翻两次（先弃 CSS-in-JS，产品定位再从 Typst 转为 Markdown）。其中 `quickstart.md` 还在教人 `npm install today-ui griffel-vue` |
| `001-vue3-fluentui-design/design-token.md` | **未删除，迁出为 `design-token.md`** —— 它讲的是上游 Fluent 的机制，不含本项目实现，仍有参考价值 |

> **整理原则**：文档描述了一个**已废弃的约定**，比文档缺失更危险 —— 它会让人（和 AI 工具）照着旧方案写出不一致的代码。`.github/copilot-instructions.md` 曾因此按 `griffel-vue` 方案生成代码。
