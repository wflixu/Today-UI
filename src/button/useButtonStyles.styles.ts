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
    const { appearance, shape, size, disabled, iconOnly } = state;

    // 合并语义化类名和 Griffel 原子化类名
    const rootClasses = [
        buttonClassNames.root,           // 保留语义化类名
        styles.root,                      // Griffel 基础样式
        appearance === 'primary' && styles.primary,
        appearance === 'outline' && styles.outline,
        appearance === 'subtle' && styles.subtle,
        appearance === 'transparent' && styles.transparent,
        shape === 'square' && styles.square,
        shape === 'circular' && styles.circular,
        size === 'small' && styles.small,
        size === 'large' && styles.large,
        iconOnly && styles.iconOnly,
        disabled && styles.disabled,
    ].filter(Boolean);

    // 应用类名到状态
    state.root = {
        ...state.root,
        className: mergeClasses(...rootClasses),
    };

    // 处理图标样式
    if (iconOnly && state.icon) {
        state.icon = {
            ...state.icon,
            className: mergeClasses(buttonClassNames.icon, styles.icon),
        };
    }
};

/**
 * 向后兼容的样式函数
 */
export const useButtonStyles = useButtonStyles_unstable;