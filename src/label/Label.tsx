import { computed, defineComponent, SlotsType } from 'vue';
import { labelProps, type LabelSlots } from './Label.types';
import { useLabel } from './useLabel';
import { useLabelStyles } from './useLabelStyles.styles';
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
            useLabelStyles(labelState);
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
