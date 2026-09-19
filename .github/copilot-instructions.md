# Today-UI Development Guidelines

> **完整约定以 [CLAUDE.md](../CLAUDE.md) 为准**，本文件只列要点。
> 设计文档见 [specs/](../specs/README.md)。

## Project

Today-UI 是把微软 `@fluentui/react-components` 转录到 Vue 3 的 Fluent Design 组件库。
技术栈：TypeScript 5.x、Vue 3.x + TSX、Histoire、Vitest、tsdown（纯 ESM 输出）。

**样式方案是纯 CSS 变量 + BEM + CSS `@layer` —— 不使用 CSS-in-JS。**
历史上的 `griffel-vue` 方案已于 2026-02 废弃，见 [specs/style.md](../specs/style.md) 的迁移历史。

## Commands

```bash
pnpm dev            # Histoire 开发服务器
pnpm build          # tsdown 构建
pnpm test           # Vitest（jsdom）
pnpm test:coverage  # 覆盖率
pnpm typecheck      # vue-tsc
pnpm lint           # ESLint + 自动修复
```

## Project Structure

```
src/
├── <component>/          # 每个组件一个目录
│   ├── Xxx.tsx           # defineComponent + computed state + render
│   ├── Xxx.types.ts      # props 四段式：union 类型 / xxxProps / XxxProps / XxxState+Slots
│   ├── useXxx.ts         # 状态 hook，返回 state（root 初建不含 className）
│   ├── renderXxx.ts      # 渲染函数，用 h() 而非 JSX
│   ├── useXxxClasses.ts  # 类名 hook
│   ├── xxx.css
│   ├── docs/             # <ComponentName>.story.vue + SPEC.md
│   └── tests/            # <ComponentName>.test.ts（必需）
├── style/index.css       # 样式入口
├── theme/tokens/         # 设计令牌
├── shared/               # 共享工具（多数未使用，只用 cn / AttachNode / withInstall）
└── components.ts         # 组件导出清单
```

参考实现：`src/button/`、`src/input/`（**新式**）。`dropdown`/`dialog`/`menu`/`file-tree`/`tabs`/`toast` 是**旧式**遗留，勿照抄。

## Code Style

- **组件名一律加 `T` 前缀**（`TButton`、`TInput`…），`defineComponent` 的 `name` 与导出符号必须同名。原因：`app.use()` 走全局注册，不加前缀会与第三方库静默冲突
- 类型名**不加**前缀（组件 `TButton`，props 类型 `ButtonProps`）
- 新组件需在**三处**注册：`src/components.ts`、`src/style/index.css`、`src/interface.ts`
- 每个组件必须有 `tests/<ComponentName>.test.ts`
- CSS 类名 BEM + `t-` 前缀；允许原生 CSS 嵌套（`&` 必须显式书写）；**禁止 `!important`**
- **不实现无障碍**：不写 ARIA、不做键盘导航、不设 `role` / `tabIndex`
