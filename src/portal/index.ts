export { TPortal } from './Portal';
export { TPortal as default } from './Portal';

export type { PortalProps, PortalState, PortalSlots } from './Portal.types';
export { usePortal, useScrollLock, resolveAttach } from './usePortal';
export { renderPortal } from './renderPortal';

// 此处不 import './portal.css' —— 样式统一由 src/style/index.css 引入，避免重复进产物。
