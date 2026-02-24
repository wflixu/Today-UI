/**
 * Tabs Component Styles (Griffel)
 * 使用 griffel-vue 的 CSS-in-JS 方案定义 Tabs 样式
 */

import { makeStyles } from '@/shared/griffel';

export const useTabsStyles = makeStyles({
  // ========== Tablist 容器 ==========
  tablist: {
    display: 'grid',
    alignItems: 'flexEnd',
  } as any,

  // ========== Tab 按钮容器 ==========
  btnsBox: {
    display: 'flex',
    alignItems: 'center',
    borderWidth: '0px',
    borderStyle: 'solid',
    borderColor: 'var(--colorCompoundBrandStroke)',
    borderBottomWidth: '1px',
  } as any,

  // ========== 单个 Tab 按钮 ==========
  btn: {
    display: 'inlineFlex',
    height: '36px',
    alignItems: 'center',
    justifyContent: 'spaceBetween',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderTopLeftRadius: 'var(--borderRadiusMedium)',
    borderTopRightRadius: 'var(--borderRadiusMedium)',
    rowGap: '4px',
    columnGap: '4px',
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '8px',
    paddingRight: '8px',
    maxWidth: '12em',
    minWidth: '3em',
    position: 'relative',
  } as any,

  // ========== 激活状态的 Tab ==========
  btnActive: {
    borderColor: 'var(--colorCompoundBrandStroke)',
    borderBottomColor: 'transparent',
  } as any,

  // ========== Tab 标题 ==========
  title: {
    flex: '1 1 0%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  } as any,

  // ========== Tab 关闭按钮 ==========
  close: {
    width: '18px',
    display: 'inlineFlex',
    alignItems: 'center',
  } as any,

  // ========== Tablist Tab (tabs.css 中的样式) ==========
  tablistTab: {
    position: 'relative',
    gridRowStart: '1',
    display: 'inlineFlex',
    height: '2rem',
    cursor: 'pointer',
    appearance: 'none',
    userSelect: 'none',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: '.875rem',
    lineHeight: '1.25rem',
    lineHeight: '2',
    borderWidth: '0px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderTopWidth: '0px',
    borderRightWidth: '0px',
    borderBottomWidth: '1px',
    borderLeftWidth: '0px',
    borderTopLeftRadius: '1em',
    borderTopRightRadius: '1em',
    borderBottomColor: '#d1d1d1',
    color: '#161616',
  } as any,

  // ========== Tab 激活状态 (tabs.css) ==========
  tabActive: {
    borderWidth: '1px',
    borderStyle: 'solid',
    backgroundColor: '#fff',
  } as any,

  // ========== Tab 关闭图标 ==========
  tabClose: {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    right: '8px',
    width: '16px',
    height: '16px',
    display: 'inlineFlex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  } as any,
} as const);
