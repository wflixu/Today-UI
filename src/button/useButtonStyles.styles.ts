import type { ButtonState } from './Button.types';

// 类名常量
export const buttonClassNames = {
    root: 't-button',
    icon: 't-button__icon',
} as const;

/**
 * Button 样式钩子函数
 * 基于 CSS 变量系统生成类名
 */
export const useButtonStyles_unstable = (state: ButtonState) => {
    const { appearance, shape, size, disabled, iconOnly } = state;

    // 生成根元素类名
    const rootClasses = [
        buttonClassNames.root,
        appearance !== 'secondary' ? `${buttonClassNames.root}-appearance-${appearance}` : '',
        shape !== 'rounded' ? `${buttonClassNames.root}-shape-${shape}` : '',
        size !== 'medium' ? `${buttonClassNames.root}-size-${size}` : '',
        iconOnly ? `${buttonClassNames.root}-icon-only` : '',
        disabled ? `${buttonClassNames.root}-disabled` : '',
    ].filter(Boolean);

    // 生成图标类名
    const iconClasses = [
        buttonClassNames.icon,
    ].filter(Boolean);

    // 应用类名到状态
    state.root = {
        ...state.root,
        className: rootClasses.join(' '),
    };

    if (iconOnly) {
        state.icon = {
            ...state.icon,
            className: iconClasses.join(' '),
        };
    }
};

/**
 * 向后兼容的样式函数
 */
export const useButtonStyles = useButtonStyles_unstable;