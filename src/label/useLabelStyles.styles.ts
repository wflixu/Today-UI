import { mergeClasses } from '@/shared/griffel/mergeClasses';
import type { LabelState } from './Label.types';
import { useLabelStyles as useGriffelStyles } from './label.styles';

// 类名常量
export const labelClassNames = {
    root: 't-label',
    requiredIndicator: 't-label__required-indicator',
} as const;

/**
 * Label 样式钩子函数
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 */
export const useLabelStyles_unstable = (state: LabelState): void => {
    // 获取 Griffel 样式
    const styles = useGriffelStyles();
    const { size, weight, disabled } = state;

    // 根元素类名
    const rootClasses = [
        labelClassNames.root,                    // 语义化类名 .t-label
        size !== 'medium' && `size-${size}`,     // BEM 修饰符 .size-small
        weight !== 'semibold' && `weight-${weight}`, // BEM 修饰符 .weight-normal
        disabled && 'disabled',                  // BEM 修饰符 .disabled
        styles.root,                             // Griffel 基础样式
        size !== 'medium' && styles[size as keyof typeof styles],       // Griffel 尺寸样式
        weight !== 'semibold' && styles[weight as keyof typeof styles],  // Griffel 字体粗细样式
        disabled && styles.disabled,             // Griffel 禁用样式
    ].filter(Boolean);

    // 应用类名到状态
    state.root = {
        ...state.root,
        className: mergeClasses(...rootClasses, state.root.className as string),
    };

    // 处理 required indicator 样式
    if (state.requiredIndicator) {
        const requiredIndicatorClasses = [
            labelClassNames.requiredIndicator,  // 语义化类名
            styles.requiredIndicator,           // Griffel 样式
        ].filter(Boolean);

        state.requiredIndicator = {
            ...state.requiredIndicator,
            className: mergeClasses(...requiredIndicatorClasses),
        };
    }
};

/**
 * 向后兼容的样式函数
 */
export const useLabelStyles = useLabelStyles_unstable;
