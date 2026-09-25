export { TDropdown } from './Dropdown';
export { TDropdown as default } from './Dropdown';

export type {
  DropdownProps,
  DropdownState,
  DropdownSlots,
  DropdownTrigger,
  IDropdownOption,
} from './Dropdown.types';

// 此处不 import './dropdown.css' —— 样式统一由 src/style/index.css 引入，避免重复进产物。
