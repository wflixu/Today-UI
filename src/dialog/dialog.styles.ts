/**
 * Dialog Component Styles (Griffel)
 * 使用 griffel-vue 的 CSS-in-JS 方案定义 Dialog 样式
 */

import { makeStyles } from '@/shared/griffel';

export const useDialogStyles = makeStyles({
  // ========== Dialog 根元素 ==========
  root: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderTopColor: 'var(--colorTransparentStroke)',
    borderRightColor: 'var(--colorTransparentStroke)',
    borderBottomColor: 'var(--colorTransparentStroke)',
    borderLeftColor: 'var(--colorTransparentStroke)',
    borderTopLeftRadius: 'var(--borderRadiusXLarge)',
    borderTopRightRadius: 'var(--borderRadiusXLarge)',
    borderBottomRightRadius: 'var(--borderRadiusXLarge)',
    borderBottomLeftRadius: 'var(--borderRadiusXLarge)',
    display: 'block',
    userSelect: 'unset',
    visibility: 'unset',
    position: 'fixed',
    inset: '0px',
    height: 'fitContent',
    maxWidth: '600px',
    maxHeight: '100vh',
    boxSizing: 'borderBox',
    backgroundColor: 'var(--colorNeutralBackground1)',
    color: 'var(--colorNeutralForeground1)',
    paddingTop: '24px',
    paddingBottom: '24px',
    paddingLeft: '24px',
    paddingRight: '24px',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  } as any,

  // ========== Dialog Body ==========
  body: {
    overflow: 'unset',
    rowGap: '8px',
    columnGap: '8px',
    display: 'grid',
    maxHeight: 'calc(100vh - 48px)',
    boxSizing: 'borderBox',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '1fr 1fr auto',
  } as any,

  // ========== Dialog Header ==========
  header: {
    fontFamily: 'var(--fontFamilyBase)',
    fontSize: 'var(--fontSizeBase500)',
    fontWeight: 'var(--fontWeightSemibold)',
    lineHeight: 'var(--lineHeightBase500)',
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: '0px',
    marginRight: '0px',
    gridArea: '1 / 1 / 1 / 3',
  } as any,

  // ========== Dialog Content ==========
  content: {
    paddingTop: 'var(--strokeWidthThick)',
    paddingBottom: 'var(--strokeWidthThick)',
    paddingLeft: 'var(--strokeWidthThick)',
    paddingRight: 'var(--strokeWidthThick)',
    marginTop: 'calc(var(--strokeWidthThick) * -1)',
    marginBottom: 'calc(var(--strokeWidthThick) * -1)',
    marginLeft: 'calc(var(--strokeWidthThick) * -1)',
    marginRight: 'calc(var(--strokeWidthThick) * -1)',
    fontFamily: 'var(--fontFamilyBase)',
    fontSize: 'var(--fontSizeBase300)',
    fontWeight: 'var(--fontWeightRegular)',
    lineHeight: 'var(--lineHeightBase300)',
    overflowY: 'auto',
    minHeight: '32px',
    boxSizing: 'borderBox',
    gridArea: '2 / 1 / 2 / 4',
  } as any,

  // ========== Dialog Actions ==========
  actions: {
    gridColumnStart: '2',
    gridColumnEnd: '4',
    justifySelf: 'end',
    rowGap: '8px',
    columnGap: '8px',
    height: 'fitContent',
    boxSizing: 'borderBox',
    display: 'flex',
    gridRow: '3 / 3',
  } as any,

  // ========== Overlay ==========
  overlay: {
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    overflow: 'auto',
    backgroundColor: '#00000080',
    zIndex: 1000,
  } as any,
} as const);
