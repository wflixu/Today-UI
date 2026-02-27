import { computed, defineComponent, SlotsType } from 'vue';
import { helperTextProps, type HelperTextSlots } from './HelperText.types';
import { useHelperText } from './useHelperText';
import { useHelperTextClasses } from './useHelperTextClasses';
import { renderHelperText } from './renderHelperText';

/**
 * HelperText component - Provides helper text or validation messages for form controls
 *
 * HelperText is typically used with Field component to display additional information
 * about a form control, such as usage hints or validation messages.
 *
 * @example
 * ```vue
 * <Field>
 *   <template #label>
 *     <Label for="password">密码</Label>
 *   </template>
 *   <Input id="password" type="password" />
 *   <template #helperText>
 *     <HelperText>密码长度至少 8 位，包含字母和数字</HelperText>
 *   </template>
 * </Field>
 * ```
 */
export const HelperText = defineComponent({
    name: 'HelperText',

    props: helperTextProps,

    slots: Object as SlotsType<HelperTextSlots>,

    setup(props, { expose, slots }) {
        // Compute the complete state by applying hooks
        const state = computed(() => {
            const helperTextState = useHelperText(props);

            // 使用纯 CSS 类名 Hook
            const classes = useHelperTextClasses({
                disabled: helperTextState.disabled,
                validationState: helperTextState.validationState,
            });

            // 应用类名到状态
            if (helperTextState.root) {
                helperTextState.root.className = classes;
            }

            return helperTextState;
        });

        // Expose the component's public API
        expose({
            state,
        });

        // Render function
        return () => renderHelperText(state.value, slots);
    },
});

export default HelperText;
