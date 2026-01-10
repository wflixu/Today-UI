# Today-UI Scripts 命令说明

## 开发相关

- `pnpm dev` - 启动 Histoire 开发服务器（http://localhost:6006）
- `pnpm preview` - 启动 Vite 预览服务器（端口 5050）

## 构建相关

- `pnpm build` - 完整构建：Vite 库构建 + TypeScript 类型生成
- `pnpm build:lib` - 仅执行 Vite 库构建
- `pnpm build:types` - 仅生成 TypeScript 类型声明文件

## 文档相关

- `pnpm doc` - 构建 Histoire 文档
- `pnpm doc:preview` - 预览构建好的 Histoire 文档

## 测试相关

- `pnpm test` - 运行所有测试（jsdom 环境）
- `pnpm test:watch` - 监视模式运行测试
- `pnpm test:ui` - 启动 Vitest UI 界面
- `pnpm test:coverage` - 生成测试覆盖率报告

## 代码质量

- `pnpm typecheck` - 运行 TypeScript 类型检查
- `pnpm lint` - 运行 ESLint 并自动修复
- `pnpm lint:check` - 仅检查 ESLint 错误，不修复

## 使用示例

### 开发流程
```bash
# 1. 启动开发服务器
pnpm dev

# 2. 运行类型检查
pnpm typecheck

# 3. 运行测试
pnpm test

# 4. 检查代码风格
pnpm lint:check
```

### 构建流程
```bash
# 1. 构建库文件
pnpm build:lib

# 2. 生成类型声明
pnpm build:types

# 3. 或者一步完成完整构建
pnpm build

# 4. 预览构建结果
pnpm preview
```

### 发布前检查
```bash
# 1. 类型检查
pnpm typecheck

# 2. 完整构建
pnpm build

# 3. 运行测试
pnpm test:coverage

# 4. 代码风格检查
pnpm lint:check

# 5. 构建文档
pnpm doc
```

## 变更说明

### 删除的命令
- `dts` - API Extractor 相关命令
- `bd`, `b`, `bt` - 简化的构建命令，被新的命令替代
- `typecheck: vitest` - 专用的测试类型检查，被通用 typecheck 替代

### 新增的命令
- `build:lib` - 仅构建库文件
- `build:types` - 仅生成类型声明
- `test:watch` - 监视模式测试
- `test:ui` - Vitest UI 界面
- `test:coverage` - 测试覆盖率
- `lint:check` - 仅检查不修复

### 优化的命令
- `build` - 简化了构建流程，去除了 API Extractor
- `typecheck` - 简化为通用的类型检查
- `test` - 统一为 `test` 而不是 `test:unit`