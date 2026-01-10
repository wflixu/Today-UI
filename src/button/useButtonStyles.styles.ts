import type { ButtonState } from './Button.types';
import { useButtonStyles as useGriffelStyles } from './button.styles';
import { mergeClasses } from '@/shared/griffel/mergeClasses';

// 类名常量
export const buttonClassNames = {
    root: 't-button',
    icon: 't-button__icon',
} as const;

/**
 * Button 样式钩子函数
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 */
export const useButtonStyles_unstable = (state: ButtonState) => {
    // 获取 Griffel 样式
    const styles = useGriffelStyles();
    const { appearance, shape, size, disabled, iconOnly, loading, iconPosition } = state;

    // 根元素类名
    const rootClasses = [
        buttonClassNames.root,                    // 语义化类名 .t-button
        appearance !== 'secondary' && `appearance-${appearance}`,  // BEM 修饰符 .appearance-outline
        shape !== 'rounded' && `shape-${shape}`,  // BEM 修饰符 .shape-circular
        size !== 'medium' && `size-${size}`,      // BEM 修饰符 .size-small
        disabled && 'disabled',                   // BEM 修饰符 .disabled
        loading && 'loading',                     // BEM 修饰符 .loading
        iconOnly && 'icon-only',                  // BEM 修饰符 .icon-only
        styles.root,                              // Griffel 基础样式
        appearance !== 'secondary' && styles[appearance as keyof typeof styles],            // Griffel 外观样式
        shape !== 'rounded' && styles[shape as keyof typeof styles],                      // Griffel 形状样式
        size !== 'medium' && styles[size as keyof typeof styles],                          // Griffel 尺寸样式
        iconOnly && styles[`iconOnly${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles],  // Griffel icon-only 样式
        disabled && styles.disabled,                              // Griffel 禁用样式
        loading && styles.loading,                                // Griffel 加载样式
        appearance === 'primary' && styles.primaryFocus,          // Griffel primary 焦点样式
    ].filter(Boolean);

    // 图标类名
    const iconClasses = [
        buttonClassNames.icon,
        styles.icon,
        size !== 'medium' && styles[`icon${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles],
        iconPosition === 'before' ? styles.iconBefore : styles.iconAfter,
    ].filter(Boolean);

    // 应用类名到状态
    state.root = {
        ...state.root,
        className: mergeClasses(...rootClasses, state.root.className as string),
    };

    // 处理图标样式
    if (state.icon) {
        state.icon = {
            ...state.icon,
            className: mergeClasses(...iconClasses, state.icon.className as string),
        };
    }
};

/**
 * 向后兼容的样式函数
 */
export const useButtonStyles = useButtonStyles_unstable;