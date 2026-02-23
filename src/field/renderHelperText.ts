import { h } from 'vue';
import type { HelperTextState, HelperTextSlotsType } from './HelperText.types';

/**
 * Render the HelperText component
 */
export const renderHelperText = (state: HelperTextState, slots: HelperTextSlotsType) => {
    const helperTextContent = slots.default?.() || state.text;

    return h('span', {
        ...state.root,
        role: state.validationState !== 'none' ? 'status' : undefined,
        'aria-live': state.validationState !== 'none' ? 'polite' : undefined,
    }, helperTextContent);
};
