/**
 * Menu Component Styles (Griffel)
 * 使用 griffel-vue 的 CSS-in-JS 方案定义 Menu 样式
 */

import { makeStyles } from '@/shared/griffel';

export const useMenuStyles = makeStyles({
  // ========== Menu 根元素 ==========
  root: {
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '4px',
    paddingRight: '4px',
    width: 'maxContent',
    boxShadow: '0 0 2px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.14)',
    overflowX: 'hidden',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    backgroundColor: 'white',
  } as any,

  // ========== Menu List ==========
  list: {
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '2px',
    columnGap: '2px',
    lineHeight: '20px',
  } as any,

  // ========== Menu Item ==========
  item: {
    display: 'flex',
    flexShrink: '0',
    alignItems: 'flexStart',
    cursor: 'pointer',
    rowGap: '4px',
    columnGap: '4px',
    minHeight: '32px',
    boxSizing: 'borderBox',
    paddingTop: '6px',
    paddingBottom: '0px',
    paddingLeft: '6px',
    paddingRight: '6px',
    borderRadius: '4px',
    maxWidth: '360px',
  } as any,

  // ========== Menu Item Hover ==========
  itemHover: {
    backgroundColor: '#f5f5f5',
  } as any,

  // ========== Menu Item Icon ==========
  itemIcon: {
    display: 'inlineFlex',
    width: '20px',
    height: '20px',
    justifyContent: 'center',
    fontSize: '20px',
  } as any,

  // ========== Menu Item Marker ==========
  itemMarker: {
    display: 'inlineFlex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '16px',
    width: '16px',
    fontSize: '16px',
  } as any,

  // ========== Menu Item Content ==========
  itemContent: {
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '2px',
    paddingRight: '2px',
    flexGrow: '1',
    textAlign: 'left',
  } as any,

  // ========== Menu Item Secondary ==========
  itemSecondary: {
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '2px',
    paddingRight: '2px',
    textAlign: 'right',
  } as any,
} as const);
