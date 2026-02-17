import { computed, defineComponent, SlotsType } from 'vue';
import { fieldProps, type FieldSlots } from './Field.types';
import { useField } from './useField';
import { useFieldStyles } from './useFieldStyles.styles';
import { renderField } from './renderField';

/**
 * Field component - Layout container for combining Label, Input, HelperText, and ValidationMessage
 *
 * Field is an independent layout container. Users must manually compose it with Label and HelperText components.
 *
 * @example
 * ```vue
 * <Field>
 *   <template #label>
 *     <Label for="email" required>Email address</Label>
 *   </template>
 *   <Input id="email" v-model="email" type="email" />
 *   <template #helperText>
 *     <HelperText>Please enter your work email</HelperText>
 *   </template>
 * </Field>
 * ```
 */
export const Field = defineComponent({
    name: 'Field',

    props: fieldProps,

    slots: Object as SlotsType<FieldSlots>,

    setup(props, { expose, slots }) {
        // Compute the complete state by applying hooks
        const state = computed(() => {
            const fieldState = useField(props);
            useFieldStyles(fieldState);
            return fieldState;
        });

        // Expose the component's public API
        expose({
            state,
        });

        // Render function
        return () => renderField(state.value, slots);
    },
});

export default Field;
