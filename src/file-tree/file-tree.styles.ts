/**
 * FileTree Component Styles (Griffel)
 * 使用 griffel-vue 的 CSS-in-JS 方案定义 FileTree 样式
 */

import { makeStyles } from '@/shared/griffel';

export const useFileTreeStyles = makeStyles({
  // ========== FileTree 根元素 ==========
  root: {
    boxSizing: 'borderBox',
    backgroundColor: '#fff',
    borderRadius: '2px',
  } as any,

  // ========== Node 根元素 ==========
  node: {
    height: '30px',
    color: '#575d6c',
    lineHeight: '1.5',
    whiteSpaceCollapse: 'collapse',
    textWrap: 'nowrap',
    fontSize: '0',
    position: 'relative',
    display: 'flex',
    width: '100%',
  } as any,

  // ========== Node 激活状态 ==========
  nodeActive: {
    backgroundColor: 'var(--to-list-item-selected-bg, #0f6cbd)',
    color: '#fff',
    textDecoration: 'none',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
  } as any,

  // ========== Node Hover 状态（非激活） ==========
  nodeHover: {
    backgroundColor: 'var(--to-list-item-hover-bg, #f2f2f3)',
    transitionDuration: '0.5s',
    transitionProperty: 'background-color',
    transitionTimingFunction: 'ease',
    transitionDelay: '0s',
  } as any,

  // ========== Node 内容 ==========
  nodeContent: {
    display: 'inlineFlex',
    width: '100%',
    alignItems: 'center',
    fontSize: 'var(--to-font-size, 14px)',
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '6px',
    paddingRight: '10px',
    cursor: 'pointer',
    borderRadius: 'var(--to-border-radius, 2px)',
  } as any,

  // ========== Node 内容包装器 ==========
  nodeContentValueWrapper: {
    display: 'inlineFlex',
    alignItems: 'center',
    height: '30px',
    overflow: 'hidden',
  } as any,

  // ========== Node Toggle（展开/收起按钮） ==========
  nodeToggle: {
    cursor: 'pointer',
    display: 'inlineFlex',
    justifyContent: 'center',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    fontSize: 'var(--to-font-size-icon, 16px)',
    height: '16px',
    width: '16px',
    alignItems: 'center',
  } as any,

  // ========== Node Toggle 加载状态 ==========
  nodeToggleLoading: {
    transform: 'rotate(45deg)',
    animationName: 'toggle-spin',
    animationDuration: '1.2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  } as any,

  // ========== Node 标题 ==========
  nodeTitle: {
    cursor: 'pointer',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    marginLeft: '4px',
    display: 'inlineBlock',
    maxWidth: '100%',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: 'transparent',
    borderRadius: 'var(--to-border-radius, 2px)',
    flex: '1 1 0%',
  } as any,

  // ========== Node 水平线 ==========
  nodeHline: {
    width: '9px',
    height: '1px',
    backgroundColor: '#ddd',
    position: 'absolute',
    top: '50%',
  } as any,

  // ========== Node 垂直线 ==========
  nodeVline: {
    width: '1px',
    backgroundColor: '#ddd',
    position: 'absolute',
  } as any,

  // ========== Margin Right 工具类 ==========
  mr2: {
    marginRight: '8px',
  } as any,
} as const);
