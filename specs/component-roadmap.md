# Today-UI 组件实现路线图

**项目**: Today-UI - Fluent Design Vue3 组件库
**参考源**: @fluentui/react-components (v9)
**驱动应用**: typster (Markdown 编辑器) — `/Users/lixu/code/typster`
**更新日期**: 2026-09-19

---

## 战略调整：从清单驱动改为场景驱动

本路线图此前按 `@fluentui/react-components` 的组件清单顺序铺开（P0~P5 功能分组）。实践下来问题很明显：**没有应用场景，就无法检验组件好不好用**——组件写完了，样式对不对、API 顺不顺手、缺什么变体，全凭猜。

现在改为**由真实应用场景驱动**：typster 是 Today-UI 的第一个消费者，也是一个正在使用的真实产品。先把它需要的组件做扎实，做好了再去铺剩余组件。

### 两条排序原则

1. **被依赖最多的先做** —— 判断「基础组件」的标准是**被多少个其它组件依赖**，不是「用起来简单」
2. **编辑器要用的先做** —— typster 正在使用的组件，优先于清单上排名靠前但没人用的组件

两条原则的**交集**就是最高优先级。

### 两个阶段

| 阶段 | 目标 | 验收标准 |
|------|------|----------|
| **阶段一** | 让 typster 完全跑在 Today-UI 上 | typster 移除 `primevue` 依赖，删除 `src/shared/uilib.ts` |
| **阶段二** | 编辑器工具栏组件做扎实，然后泛化 | 工具栏所需的 8 个组件在编辑器中「用着顺手」，再铺剩余组件 |

**阶段二的意义**：这些组件同样有真实使用场景兜底，避免出现「实现完了不知道好不好用」的循环。

### 驱动应用的定位：Markdown 优先，Typst 推后

typster 的产品目标经历过一次转向，直接影响本文档的排序：

| 时期 | 目标 | 状态 |
|------|------|------|
| 最初 | Typst 可视化编辑器（对标 Typora） | 已放弃 |
| **现在** | **好用的 Markdown 编辑工具** | **进行中** |
| 远期 | 在 Markdown 版本成熟后，再补 Typst 支持 | 未开始 |

**转向原因**：TipTap 官方不支持 Typst 语法，需要自行实现大量扩展（数学公式节点、Typst 语法解析等）。工作量远超预期，且当时自己使用 Typst 的频率也不高。

**对本文档的影响**：

- 路线图按 **Markdown 编辑器**的需求排序。Typst 相关需求（数学公式编辑浮层、Typst 语法节点编辑等复杂交互）**不参与当前排期**
- 好消息是 Markdown 对组件的需求更「少而标准」：不需要公式编辑器那类复杂浮层组合，阶段二的复杂度因此降低
- typster 侧遗留的 Typst 代码（`src/pages/typst/` 未接入路由、`src/shared/typst-extensions/` 为空目录）属于该仓库自身的技术债，与本组件库无关

---

## 当前进度

### 组件状态总览

| 状态 | 数量 | 组件 |
|------|:----:|------|
| ✅ 已导出 + 有测试 | 5 | Button、Input、Field、Label、Tooltip |
| 🟡 已导出，缺测试 | 5 | Icon、Dropdown、Menu、Tabs、FileTree |
| ⚠️ 有代码，未导出 | 2 | Dialog、Toast（后者是空壳） |
| ❌ 未实现 | 43 | 见[附录 A](#附录-afluent-组件全景对照) |

### ⚠️ typster 的实际使用量：0

**这是恢复项目后第一个要解决的问题。**

typster 的 `src/main.ts` 确实调用了 `app.use(TodayUI)`，但紧接着 `app.use(setupUILib)` 用 PrimeVue 的组件覆盖了它：

```ts
// src/shared/uilib.ts —— 用 PrimeVue 组件注册成同名全局组件
import Button from "primevue/button";
import Menu from 'primevue/menu';
// ...

app.use(TodayUI);      // 注册了 Button、Input、Label、Field、TIcon、TMenu...
app.use(setupUILib);   // 后执行 —— PrimeVue 的 Button/Menu 覆盖掉 Today-UI 的同名组件
```

Today-UI 的 `Button` 组件 `name` 恰好是 `'Button'`（无前缀），被 PrimeVue 的 `Button` 遮蔽。模板中那 7 处 `<Button>` 渲染的全是 PrimeVue 组件。其余 PrimeVue 组件（`Select`/`Tree`/`ContextMenu`/`InputText`）名字 Today-UI 根本没有，也就无从替代。

**净结果：Today-UI 在 typster 中一个组件都没被使用**，插件只是空挂。

> **顺带暴露的问题**：组件名前缀不统一。`Button`/`Input`/`Label`/`Field`/`Spinner`/`HelperText`/`Tablist` 无前缀，`TIcon`/`TMenu`/`TDropdown`/`TDialog`/`TToast`/`TTabs`/`TFileTree` 有 `T` 前缀。这既造成与第三方库的命名碰撞，也让使用者无法预期。**建议在阶段一结束前统一为无前缀**（Fluent 风格），或统一加前缀，二选一。

### 编辑器的真实组件需求

typster 当前用 PrimeVue 的部分，就是 Today-UI 要替代的清单：

| PrimeVue 组件 | 用在哪里 | Today-UI 对等物 | 现状 |
|---------------|----------|-----------------|------|
| `Button` | Sidebar、AboutSettings | Button | ✅ 已有 |
| `InputText` | EditorSettings | Input | ✅ 已有 |
| `InputSwitch` | Autosave/Editor/About 设置页 | **Switch** | ❌ 未实现 |
| `InputNumber` | Autosave/Editor/Appearance 设置页 | **SpinButton** | ❌ 未实现 |
| `Select` | Sidebar、AppearanceSettings | Dropdown | 🟡 有实现缺测试 |
| `ContextMenu` | Sidebar 文件树右键菜单 | Menu | 🟡 有实现缺测试 |
| `Tree` | Sidebar 主视图 | FileTree | 🟡 有实现缺测试 |
| `ProgressSpinner` | PageLoading | **Spinner** | ❌ 未实现 |
| `Dialog` | — | Dialog | ⚠️ 有代码未导出 |
| `Toast` | AddProject | Toast | ⚠️ 空壳 |
| `Card` | — | **Card** | ❌ 未实现 |
| `SelectButton` | — | **SegmentedControl** | ❌ 未实现 |

**另外还有一层尚未显现的需求**：`src/components/tiptap-editor/TiptapEditor.vue` 目前只有 231 行，**编辑器工具栏还不存在**。工具栏一旦开建，会立刻需要 Toolbar、Divider、Popover、Dropdown、Combobox、Slider、Checkbox、ColorPicker。这是阶段二的主体。

---

## 组件分类（按依赖层级）

按**依赖层级**分类而非功能领域，因为「基础组件优先」的判据是依赖数。

### L0 原语层 —— 真正的「基础组件」

其它组件构建在其之上。**这一层是当前架构最大的缺口。**

| 组件 | 被谁依赖 | 依赖数 | 现状 |
|------|----------|:------:|------|
| **Portal** | Dialog、Toast、Popover、Menu、Select、Combobox、Tooltip、Toolbar-Overflow、DatePicker… | **10+** | ❌ 未实现 |
| **Popover** | Menu、Select、Combobox、Dropdown、Tooltip、DatePicker、TimePicker、ColorPicker、TagPicker、TeachingPopover、Overflow | **11+** | ❌ 未实现 |
| Icon | Button、Menu、Select、Field、Tag、MessageBar、Breadcrumb、Rating… | **20+** | ✅ 已有 |
| Text | Button、Label、Menu、Card… | 4+ | ❌ 未实现 |
| Divider | Toolbar、Menu、Card、Nav | 4 | ❌ 未实现 |

#### 🚨 当前架构问题：弹出类组件各自为政

Dropdown、Tooltip、Dialog **各自独立**实现定位与挂载，没有共享原语：

| 组件 | 定位实现 | 挂载实现 |
|------|----------|----------|
| `src/dropdown/Dropdown.tsx` | 自己的 `useFloating` + 自建 `FloatTrigger.tsx` | `Teleport` |
| `src/tooltip/Tooltip.tsx` | 自己的 `useFloating` | `Teleport`（`renderTooltip.tsx`） |
| `src/dialog/Dialog.tsx` | 无定位 | `Teleport` |

若照此路子继续加 Select、Combobox、ContextMenu、DatePicker、ColorPicker，**同一套定位/关闭/层级逻辑会被抄 6 遍以上**。

**决策：先抽 Portal + Popover 原语，并把现有三个组件迁到新原语上。** 现在只有 3 个弹出组件，是重构成本最低的时刻。

### L1 原子控件 —— 不依赖其它控件

| 组件 | 现状 | 编辑器是否需要 |
|------|------|:--------------:|
| Button | ✅ | ✔ |
| Label | ✅ | ✔ |
| Input | ✅ | ✔ |
| Field | ✅ | ✔ |
| **Switch** | ❌ | ✔ 设置页 3 处 |
| **Spinner** | ❌ | ✔ PageLoading |
| **Checkbox** | ❌ | ✔ 工具栏 |
| **Divider** | ❌ | ✔ 工具栏 |
| **Text** | ❌ | — |
| Radio | ❌ | — |
| Slider | ❌ | ✔ 工具栏（行高/字号） |
| Textarea | ❌ | — |
| **SpinButton** | ❌ | ✔ 设置页 3 处 |

### L2 复合控件 —— 由 L0 + L1 组合

| 组件 | 现状 | 编辑器是否需要 |
|------|------|:--------------:|
| Tooltip | ✅ | ✔ 工具栏 |
| Dropdown | 🟡 | ✔ Sidebar、设置页 |
| Menu / ContextMenu | 🟡 | ✔ 文件树右键 |
| Dialog | ⚠️ 未导出 | ✔ |
| Toast | ⚠️ 空壳 | ✔ AddProject |
| **Select** | ❌ | ✔ 借 Popover 实现 |
| **Combobox** | ❌ | ✔ 工具栏 |
| **Card** | ❌ | ✔ |
| **ProgressBar** | ❌ | — |
| **Tag / Badge** | ❌ | — |
| **SegmentedControl** | ❌ | ✔ 替换 SelectButton |

### L3 领域组件

| 组件 | 现状 | 编辑器是否需要 |
|------|------|:--------------:|
| FileTree | 🟡 | ✔ Sidebar 主视图 |
| Tabs | 🟡 | — |
| **Toolbar** | ❌ | ✔ 编辑器核心 |
| **ColorPicker** | ❌ | ✔ 工具栏 |
| Accordion / Breadcrumb / Nav / List / Table / Avatar | ❌ | — |
| DatePicker / TimePicker / Calendar / Carousel | ❌ | — |

---

## 阶段一：替换 PrimeVue，让编辑器闭环

按「**依赖数 × 编辑器是否需要**」的交集排序。

### 1.0 架构前置：抽 Portal + Popover

| 项 | 内容 |
|----|------|
| **产出** | `Portal`（Teleport 封装：挂载目标、层级管理、滚动锁）+ `Popover`（定位、触发、关闭行为，基于 @floating-ui/vue） |
| **重构** | 将 Dropdown、Tooltip、Dialog 迁到新原语，删除重复实现 |
| **为什么排第一** | 唯一同时满足「基础」与「编辑器刚需」的项，且一次性消除三处重复 |

#### 不复用它们就把同一个 bug 抄六遍

已复现的缺陷清单（探索所得，迁移时一并修掉）：

| 缺陷 | 位置 | 影响 |
|------|------|------|
| **`whileElementsMounted: autoUpdate` 三处都没配** | Dropdown / Tooltip | **滚动、resize 时不重算位置**，浮层会跟丢锚点 |
| **无 Escape 键关闭** | 三处都没有 | — |
| **Tooltip 用 `absolute` 策略算坐标，却以 `position: fixed` 渲染** | `Tooltip.tsx:49-77` | 坐标体系不匹配，定位可能偏移 |
| **Dialog 的 click 监听累积** | `Dialog.tsx:28-34` | `watch([triggerRef])` 每次变更都 `addEventListener`，**无 `removeEventListener`** |
| Dialog 的 `width` prop 从未使用 | `dialog/props.ts` | CSS 硬编码 `max-width: 600px`，与默认值 800px 矛盾 |
| Dialog 无遮罩点击关闭、无滚动锁 | `Dialog.tsx` | — |
| Tooltip 的 `maxWidth` / `wrapText` prop 渲染层未使用 | `Tooltip.types.ts` ↔ `renderTooltip.tsx` | — |
| **`tooltip.css` 的规则是空的** | `tooltip.css:21-28` | `.t-tooltip{}` 与 `.t-tooltip__content{}` 是空规则，**没有背景/阴影/圆角/动画**；但 `docs/SPEC.md:271-346` 完整列出了这些**不存在**的样式 |
| Dropdown 的 `visible` 是单向 prop | `hooks.ts:138-148` | 非真正 v-model；首次 `immediate` 调用被跳过；无 `update:visible` |
| 死代码 | `Dropdown.tsx:23`、`hooks.ts:125-136` | `currentPosition`、`calcPopDirection` 算完从不读取 |
| 死 CSS | `dropdown.css:12,47,51` | `[data-open]` 选择器无任何代码写入这些属性 |
| class hook 定义了但组件未调用 | `useDropdownClasses.ts`、`useDialogClasses.ts` | 组件内是硬编码类名字符串 |

#### 可以直接删除的重复代码

| 重复项 | 位置 |
|--------|------|
| `FloatTrigger.tsx` ≈ `DialogTrigger.tsx`，**逐行一致** | `dropdown/FloatTrigger.tsx`、`dialog/DialogTrigger.tsx` |
| `getFirstValidChild` + `wrapContent` 两份**逐字符相同** | `dropdown/util.ts:8-30`、`shared/util.ts:15-37` |
| `getAttach` 两份 | `tooltip/renderTooltip.tsx:17-26`（**缺 HTMLElement 分支**）、`shared/dom.ts:1-13`（**零引用**） |
| provide/inject token 同形状两份 | `dropdown/util.ts:5-6`、`dialog/util.ts:3` |
| `useFloating` 调用无共享封装 | `dropdown/Dropdown.tsx:25-30`、`tooltip/Tooltip.tsx:49-61` |

### 1.1 ~ 1.10 实施顺序

| 序 | 组件 | 复杂度 | 依赖 | 理由 |
|:--:|------|:------:|------|------|
| 1 | **Portal + Popover** | 高 | @floating-ui/vue | 架构前置，见 1.0 |
| 2 | **Switch** | 低 | Label | 设置页 3 处；纯原子、无依赖，最快见效 |
| 3 | **Spinner** | 低 | — | PageLoading 刚需。Button 内部已有 spinner 实现，提取共享即可 |
| 4 | **SpinButton** | 中 | Input、Button | 设置页 3 处，两者均已就绪 |
| 5 | **Select** | 高 | Popover、Field、Label | 借新原语实现；同时收口 Dropdown 并补测试 |
| 6 | **Menu / ContextMenu 迁移** | 中 | Popover | 迁到新原语，补测试 |
| 7 | **FileTree 与 ContextMenu 打通** | 中 | ContextMenu | Sidebar 是编辑器主视图，两者配合才成立 |
| 8 | **Dialog 导出** | 低 | Portal | 已有代码，补 props/测试即可 |
| 9 | **Toast 实现** | 高 | Portal | 当前是空壳，需从头实现（含 provider 与调用 API） |
| 10 | **Card / SegmentedControl / ProgressBar** | 低 | — | 收尾，清空剩余 PrimeVue 用法 |

### 验收标准

- [ ] typster `package.json` 中移除 `primevue`、`@primevue/themes`、`primeicons`
- [ ] 删除 typster `src/shared/uilib.ts`
- [ ] typster 中不再有 `primevue/*` 的 import
- [ ] Today-UI 组件在 typster 中的实际使用量 > 0（当前为 0）
- [ ] 阶段一触及的组件全部补上 `tests/<ComponentName>.test.ts`
- [ ] 组件名前缀统一（消除与第三方库的命名碰撞）

---

## 阶段二：编辑器工具栏 + 泛化

### 2.1 工具栏组件

`src/components/tiptap-editor/TiptapEditor.vue` 目前只有 231 行，**工具栏还不存在**。开建后需要：

| 组件 | 用途 | 必要性 |
|------|------|:------:|
| **Toolbar** | 工具栏容器 + Overflow 溢出收起 | 必需 |
| **Divider** | 工具栏分组分隔 | 必需 |
| **Dropdown** | 标题层级 H1-H6 | 必需 |
| **Popover** | 链接编辑、图片插入、**表格操作菜单** | 必需 |
| **Tooltip** | 已有 ✅，需按工具栏场景打磨 | 必需 |
| **Combobox** | 代码块语言选择（`code-block-lowlight` 已装） | 必需 |
| **Checkbox** | GFM 任务列表 | 必需 |
| **Tag / Badge** | 标签 | 需要 |
| **Slider** | 视图缩放 | 可选 |
| **ColorPicker** | 高亮色 | **可选** |

> **ColorPicker 优先级下调**：标准 Markdown 没有文字颜色（这一点与 Typst 不同）。只有自定义高亮扩展才需要，不必为它提前排期。

**Markdown 编辑器特有的三个场景**，都已具备 TipTap 侧依赖、只缺 UI 组件：

| 场景 | TipTap 依赖（已装） | 需要的 UI |
|------|---------------------|-----------|
| 表格编辑（插入/删除行列） | `extension-table`、`-table-row`、`-table-cell`、`-table-header` | Popover + Button + Menu |
| 代码块语法高亮与语言选择 | `extension-code-block-lowlight`、`lowlight` | Combobox |
| 文档目录（ToC） | `extension-table-of-contents` | Tree 或 List |

### 2.2 泛化剩余组件

**触发条件**：阶段二的工具栏组件在 typster 中已用顺手。

之后按 Fluent 清单补全，优先顺序参考[附录 A](#附录-afluent-组件全景对照)：Text、Radio、Textarea、ProgressBar、Tag/Badge、MessageBar、Skeleton、Link、Image、Avatar、List、Accordion、Breadcrumb、Nav、Table…

### 2.3 基础设施欠账

不属于任何组件、但有明确价值的项：

| 项 | 说明 |
|----|------|
| 产物 `dist/style.css` | 聚合样式入口，见 [style.md](style.md#打包产物约定) |
| 样式分层改造 | `src/style/index.css` 落地 `@layer`；清理 5 个组件 CSS 中的重复 `@import` |
| 清理迁移遗留 | `src/shared/theme/`（死代码）、`use*Styles.styles.ts` 残留、`tsdown.config.ts` 的 `griffel-vue` |
| 处理 `react-components/` | 上游对照源码，确定是保留为参考还是移出仓库 |

---

## 实现注意事项

### 转录原则

从 @fluentui/react-components 转录组件时：

1. **保持 API 一致性**: Props 名称、类型、默认值应与原组件一致
2. **样式用纯 CSS 变量**: 把 `makeStyles` 的样式对象转写为 `xxx.css` 中的 BEM 规则，用 CSS 变量消费设计令牌（**不使用 CSS-in-JS**，详见 [style.md](style.md)）
3. **Hooks 转换**: React hooks → Vue 3 Composition API
4. **TSX 语法**: 保持类似的 TSX 编码风格
5. **视觉一致性**: 样式、动画、交互效果与原组件一致

> 上游的 `mergeClasses` 由 CSS `@layer` 分层替代；无障碍相关逻辑不转录（见下）。

### 不实现的功能

根据项目规范，**不实现无障碍性相关功能**：
- ❌ ARIA 属性（aria-label, aria-describedby 等）
- ❌ 键盘导航（onKeyDown, onKeyUp 等）
- ❌ role 和 tabIndex 属性
- ❌ 屏幕阅读器支持

如需无障碍性，用户应在应用层自行添加。

> **注意**：编辑器工具栏会天然需要快捷键（Ctrl+B 等）。快捷键应由**编辑器（TipTap）**处理，而非组件库——不违反上述约束。

### 组件结构规范

> ⚠️ **仓库里并存两代组件**。写新组件请follow**新式**（button / input / label / field / tooltip）。
> 旧式（dropdown / dialog / menu / file-tree / tabs / toast）是遗留，仅在改动它们时参考。

| | 新式（**新组件照这套**） | 旧式（遗留） |
|---|---|---|
| 组件 | button、input、label、field、tooltip | dropdown、dialog、menu、file-tree、tabs、toast |
| props 文件 | 单一 `Xxx.types.ts`（四段式） | 拆分 `props.ts` + `type.ts` |
| 注册导出 | `export { TXxx } from './Xxx'` + `as default` | `withInstall(_Xxx)` |

**新式组件的文件构成**：

- `Xxx.tsx` - `defineComponent` + `computed` 生成 state + 类名回写到 `state.root.className` + 返回渲染函数
- `Xxx.types.ts` - 四段式：字面量 union 类型 / `xxxProps` 对象（带 JSDoc + `@default`）/ `XxxProps = ExtractPropTypes<...>` / `XxxState` interface + `XxxSlots`
- `useXxx.ts` - 返回 state 对象，三段式：透传 props / 派生状态 / **每个 DOM 元素一个 `Record<string, any>`**。`root` 初建时**不含 className**，由组件后填
- `renderXxx.ts` - 渲染函数，用 `h()` 而非 JSX（全库无 `renderXxx.tsx` 用 JSX 的先例）
- `useXxxClasses.ts` - `xxxClassNames` 常量 + `xxxVariants` 映射 + hook；**默认值不产类名**
- `xxx.css` - 组件样式（**不写 `@layer`、不 `@import` 令牌文件**）
- `docs/<ComponentName>.story.vue` - Histoire 文档示例
- `docs/SPEC.md` - 组件设计规格（可选）
- `tests/<ComponentName>.test.ts` - **单元测试（必需）**

**注册点有三处**（缺一不可）：

1. `src/components.ts` - 否则不会被打包导出
2. `src/style/index.css` - 否则样式不会进入产物（若样式由组件自身 `import` 则可省）
3. `src/interface.ts` - 对外暴露的 props 类型白名单

### 命名规范

**组件名一律加 `T` 前缀**，`defineComponent` 的 `name` 与导出符号必须同名同前缀。

`app.use(TodayUI)` 会把组件注册到**全局命名空间**。Fluent React 不加前缀是因为 **React 没有全局组件注册**（每个组件都是显式 import），该约定在 Vue 里不成立。不加前缀会造成**静默遮蔽**——typster 里 Today-UI 的 `Button` 被 PrimeVue 覆盖，不报错、不警告，只是渲染了另一个组件。

Vue 生态中走全局注册的库都加前缀：Vuetify `V`、Element Plus `El`、Arco `A`、Naive UI `N`。

> 类型名**不加**前缀（组件是 `TButton`，props 类型仍是 `ButtonProps`）。类型只在模块作用域，不进全局命名空间。Element Plus 同样是 `ElButton` + `ButtonProps`。

### 共享工具的实际可用范围

`src/shared/` 下多数文件**没有实际被引用**。写新组件时只需这三个：

| 可复用 | 路径 | 用途 |
|---|---|---|
| `cn()` | `@/shared/styles/classUtils` | 类名拼接 |
| `AttachNode` | `shared/type` | 弹层挂载点类型 |
| `withInstall` | `shared/withInstall` | 旧式组件挂 `install` |

**不要引用**（零引用或已损坏的死代码）：

- `shared/dom.ts` - 零引用（`tooltip/renderTooltip.tsx` 另有私有 `getAttach`，两者不共用）
- `shared/bem.ts` - 零引用，mod 分隔符 `_` 与 `.t-x--y` 不匹配
- `shared/render-tnode.ts` - 零引用
- `shared/theme/` - 断链 import，指向不存在的路径
- `shared/types.ts` 的 `UnknownSlotProps` - 引用不存在的全局类型，实际是坏的
- `classUtils.ts` 的 `buildVariantClasses` / `bem` - 零引用

### 单元测试规范

**每个组件都必须编写单元测试**，确保组件功能正确、稳定可靠。

#### 测试文件规范

- **文件位置**：`src/<component-name>/tests/<ComponentName>.test.ts`
- **文件命名**：使用 `.test.ts` 后缀（不是 `.spec.ts`）
- **参考示例**：[src/button/tests/Button.test.ts](../src/button/tests/Button.test.ts)

#### 测试覆盖要求

1. **Props 渲染测试** - 所有 props 的渲染测试
2. **事件处理测试** - 所有事件的触发测试
3. **插槽测试** - 所有插槽的渲染测试
4. **动态更新测试** - 动态 props 更新测试
5. **废弃警告测试**（如适用）
6. **边界情况测试** - 极端情况测试
7. **表单功能测试**（表单组件）- v-model、受控/非受控模式

#### 覆盖率要求

- **语句覆盖率**: ≥ 80% ｜ **分支覆盖率**: ≥ 75%
- **函数覆盖率**: ≥ 80% ｜ **行覆盖率**: ≥ 80%

#### 测试命令

```bash
pnpm test                                        # 全部
pnpm test src/<component>/tests/<C>.test.ts      # 单个组件
pnpm test:watch                                  # 监听
pnpm test:coverage                               # 覆盖率
```

完整的测试规范、最佳实践和示例见 **[specs/testing-guidelines.md](testing-guidelines.md)**。

---

## 附录 A：Fluent 组件全景对照

原始的功能领域分组，保留作为**组件清单参考**。注意其中的优先级排序已被上文取代——例如 `Popover` 在此表被列为 P3「复杂交互组件」，但按依赖数它应为 L0 最高优先级。

### 基础控件

| 组件名 | 说明 | 复杂度 | Today-UI 现状 |
|--------|------|--------|---------------|
| Button | 按钮（多种 appearance / size / shape） | 中 | ✅ 完成 |
| Icon | SVG 图标系统（110+ Fluent 图标） | 中 | ✅ 完成 |
| Tooltip | 工具提示 | 中 | ✅ 完成 |

### 基础表单组件

| 组件名 | 说明 | 复杂度 | 依赖 | Today-UI 现状 |
|--------|------|--------|------|---------------|
| Checkbox | 复选框 | 低 | Label | ❌ |
| Radio | 单选框 | 低 | Label | ❌ |
| Select | 下拉选择器 | 高 | Popover, Field, Label | ❌ |
| Switch | 开关切换 | 中 | Label | ❌ |
| Textarea | 多行文本输入 | 低 | Field, Label | ❌ |
| Slider | 滑块选择器 | 中 | Label | ❌ |
| SpinButton | 数字增减输入 | 中 | Input, Button | ❌ |
| Input | 单行文本输入框 | 中 | Field, Label | ✅ 完成 |
| Field | 表单字段包装器 | 低 | Label | ✅ 完成 |
| Label | 表单标签 | 低 | — | ✅ 完成 |

### 布局与展示组件

| 组件名 | 说明 | 复杂度 | 依赖 | Today-UI 现状 |
|--------|------|--------|------|---------------|
| Card | 卡片容器 | 低 | — | ❌ |
| Divider | 分割线 | 低 | — | ❌ |
| Badge | 徽章标记 | 低 | — | ❌ |
| Avatar | 头像显示 | 中 | — | ❌ |
| List | 列表展示 | 中 | — | ❌ |
| Table | 数据表格 | 高 | — | ❌ |
| Link | 超链接 | 低 | — | ❌ |
| Text | 文本组件 | 低 | — | ❌ |
| Image | 图片组件 | 低 | — | ❌ |

### 反馈与状态组件

| 组件名 | 说明 | 复杂度 | 依赖 | Today-UI 现状 |
|--------|------|--------|------|---------------|
| Spinner | 加载动画 | 低 | — | ❌ |
| Skeleton | 骨架屏 | 中 | — | ❌ |
| Progress | 进度条 | 中 | — | ❌ |
| MessageBar | 消息提示条 | 中 | Icon | ❌ |
| Dialog | 模态对话框 | 高 | Portal, Button | ⚠️ 未导出 |

### 复杂交互组件

| 组件名 | 说明 | 复杂度 | 依赖 | Today-UI 现状 |
|--------|------|--------|------|---------------|
| Accordion | 手风琴 | 高 | — | ❌ |
| Breadcrumb | 面包屑导航 | 中 | — | ❌ |
| Drawer | 抽屉侧边栏 | 高 | Portal, Button | ❌ |
| Popover | 弹出框 | 高 | Portal | ❌ |
| TeachingPopover | 教学提示框 | 高 | Popover, Button | ❌ |
| Rating | 评分组件 | 中 | Icon | ❌ |
| Tree | 树形结构 | 高 | — | 🟡 FileTree |
| Persona | 用户信息卡片 | 中 | Avatar | ❌ |
| InfoLabel | 信息标签 | 低 | Label, Icon | ❌ |
| Nav | 导航菜单 | 高 | — | ❌ |

### 专用组件

| 组件名 | 说明 | 复杂度 | 依赖 | Today-UI 现状 |
|--------|------|--------|------|---------------|
| ColorPicker | 颜色选择器 | 高 | Input, Button, Popover | ❌ |
| DatePicker | 日期选择器 | 高 | Input, Button, Popover, Calendar | ❌ |
| TimePicker | 时间选择器 | 高 | Input, Button, Popover | ❌ |
| TagPicker | 标签选择器 | 高 | Input, Tags, Popover | ❌ |
| Combobox | 组合输入框 | 高 | Input, Select, Popover | ❌ |
| Search | 搜索框 | 中 | Input, Icon | ❌ |
| SwatchPicker | 色板选择器 | 高 | Button, Popover | ❌ |
| Calendar | 日历组件 | 高 | Button | ❌ |
| Tags | 标签组件 | 低 | — | ❌ |
| Overflow | 溢出菜单 | 高 | Menu, Popover | ❌ |
| Carousel | 轮播图 | 高 | Button | ❌ |
| Toolbar | 工具栏 | 中 | Button, Dropdown, Menu | ❌ |

### 基础设施

| 组件名 | 说明 | 复杂度 | Today-UI 现状 |
|--------|------|--------|---------------|
| Portal | 传送门（渲染到指定 DOM 节点） | 中 | ❌ |
| Provider | 主题提供者 | 低 | ❌（当前用 `data-theme` + CSS 变量替代） |

### 超出 Fluent 清单的自定义组件

| 组件名 | 说明 | 现状 |
|--------|------|------|
| FileTree | 支持懒加载的层次化文件树 | 🟡 有实现缺测试 |
| Tabs | 标签页（含 Tablist / TabPanel） | 🟡 有实现缺测试 |
| Toast | 通知系统 | ⚠️ 空壳 |
| Menu | 上下文菜单和导航菜单 | 🟡 有实现缺测试 |

---

## 附录 B：依赖关系速查

```
Portal ──┬── Popover ──┬── Menu / ContextMenu ──┬── FileTree（右键菜单）
         │             ├── Select               └── Overflow
         │             ├── Combobox
         │             ├── Dropdown（需迁移）
         │             ├── Tooltip（需迁移）
         │             └── ColorPicker / DatePicker / TimePicker / TagPicker
         ├── Dialog ─── Drawer
         └── Toast

Button ─── SpinButton
Input  ─── SpinButton / Combobox / TagPicker / Search
Label  ─── Field ─── Input / Textarea / Select / SpinButton
```

**读法**：左侧是右侧的前置依赖。`Portal` 与 `Popover` 位于整棵树的根部——这就是它们排第一的原因。

---

## 参考资源

- **官方文档**: https://react.fluentui.dev/
- **GitHub 仓库**: https://github.com/microsoft/fluentui/tree/master/packages/react-components
- **NPM 包**: https://www.npmjs.com/package/@fluentui/react-components
- **驱动应用**: `/Users/lixu/code/typster` (Markdown 编辑器，Tauri + Vue 3 + TipTap)
