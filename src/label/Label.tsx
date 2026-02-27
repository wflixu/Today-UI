import { computed, defineComponent, SlotsType } from 'vue';
import { cn } from '@/shared/styles/classUtils';
import { labelProps, type LabelSlots } from './Label.types';
import { useLabel } from './useLabel';
import { useLabelClasses, labelClassNames } from './useLabelClasses';
import { renderLabel } from './renderLabel';
import './label.css';

/**
 * Label component - Provides a label for form controls
 *
 * @example
 * ```vue
 * <Label for="email" required>Email address</Label>
 * <Input id="email" v-model="email" />
 * ```
 */
export const Label = defineComponent({
    name: 'Label',

    props: labelProps,

    slots: Object as SlotsType<LabelSlots>,

    setup(props, { expose, slots }) {
        // Compute the complete state by applying hooks
        const state = computed(() => {
            const labelState = useLabel(props);

            // 使用纯 CSS 类名 Hook
            const classes = useLabelClasses({
                size: labelState.size,
                weight: labelState.weight,
                disabled: labelState.disabled,
            });

            // 合并自定义 class 和组件类名
            const mergedClasses = props.class
                ? cn(classes, props.class)
                : classes;

            // 应用类名到状态
            labelState.root.className = mergedClasses;

            // 处理 required indicator 样式
            if (labelState.requiredIndicator) {
                labelState.requiredIndicator.className = labelClassNames.requiredIndicator;
            }

            return labelState;
        });

        // Expose the component's public API
        expose({
            state,
        });

        // Render function
        return () => renderLabel(state.value, slots);
    },
});

export default Label;
