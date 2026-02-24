/**
 * Dropdown Component Styles (Griffel)
 * 使用 griffel-vue 的 CSS-in-JS 方案定义 Dropdown 样式
 */

import { makeStyles } from '@/shared/griffel';

export const useDropdownStyles = makeStyles({
  // ========== Dropdown 触发器容器 ==========
  triggerWrap: {
    paddingTop: '6px',
    paddingBottom: '6px',
    paddingLeft: '6px',
    paddingRight: '14px',
    borderWidth: '0px',
    borderStyle: 'none',
    fontSize: '16px',
    backgroundColor: 'none',
    borderRadius: '6px',
  } as any,

  // ========== Dropdown 触发器 Hover/Open 状态 ==========
  triggerHover: {
    backgroundColor: 'var(--active-unfocused, #d7dce5)',
  } as any,

  // ========== Dropdown 菜单 ==========
  menu: {
    background: 'rgba(255, 255, 255, 0.8)',
    WebkitBackdropFilter: 'blur(10px)',
    backdropFilter: 'blur(10px)',
    width: 'maxContent',
    outline: '0',
  } as any,

  // ========== Dropdown 菜单项 ==========
  menuItem: {
    display: 'flex',
    justifyContent: 'spaceBetween',
    alignItems: 'center',
    background: 'none',
    width: 'maxContent',
    borderWidth: '0px',
    borderStyle: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    textAlign: 'left',
    lineHeight: '1.8',
    minWidth: '110px',
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: '0px',
    marginRight: '0px',
    outline: '0',
  } as any,

  // ========== Dropdown 菜单项 Hover/Focus 状态 ==========
  menuItemHover: {
    background: 'var(--highlighted, royalblue)',
    color: 'white',
  } as any,

  // ========== 嵌套打开状态 ==========
  menuItemNestedOpen: {
    background: 'var(--highlighted, royalblue)',
    color: 'white',
  } as any,

  // ========== 嵌套打开且有焦点 ==========
  menuItemNestedFocusInside: {
    background: 'var(--active-unfocused, #d7dce5)',
  } as any,
} as const);
