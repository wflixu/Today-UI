import { useSlots } from 'vue';
import type { LabelProps, LabelState } from './Label.types';

/**
 * Given user props, defines default props for Label, and returns processed state.
 * @param props - User provided props to Label component.
 */
export const useLabel = (
    props: LabelProps,
): LabelState => {
    const slots = useSlots();

    const {
        for: htmlFor,
        required = false,
        disabled = false,
        size = 'medium',
        weight = 'semibold',
        id,
        label,
    } = props;

    // 检查是否有自定义 required indicator 插槽
    const hasRequiredIndicatorSlot = () => {
        return !!(slots.requiredIndicator && slots.requiredIndicator().length > 0);
    };

    // 创建根元素配置
    const root = {
        id: id || undefined,
    };

    // 返回状态对象
    return {
        // Props passed at the top-level
        for: htmlFor,
        label,
        required,
        disabled,
        size,
        weight,
        id,

        // Element configuration
        root,
        requiredIndicator: (required && !hasRequiredIndicatorSlot()) ? {} : undefined,
    };
};
