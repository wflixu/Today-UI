import { useSlots } from 'vue';
import type { LabelProps, LabelState } from './Label.types';

/**
 * Given user props, defines default props for Label, computes derived state, and returns processed state.
 * @param props - User provided props to Label component.
 */
export const useLabel = (
    props: LabelProps,
): LabelState => {
    const slots = useSlots();

    // 检查是否有自定义 required indicator 插槽
    const hasRequiredIndicatorSlot = () => {
        return !!(slots.requiredIndicator && slots.requiredIndicator().length > 0);
    };

    // 检查是否有自定义 label 内容插槽
    const hasDefaultSlot = () => {
        return !!(slots.default && slots.default().length > 0);
    };

    // 返回状态
    return {
        // Props 传递的状态
        label: props.label,
        for: props.for,
        required: props.required || false,
        disabled: props.disabled || false,
        size: props.size || 'medium',
        weight: props.weight || 'semibold',

        // 元素配置
        root: {},
        requiredIndicator: (props.required && !hasRequiredIndicatorSlot()) ? {} : undefined,
    };
};
