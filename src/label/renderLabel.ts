import { h } from 'vue';
import type { LabelState, LabelSlotsType } from './Label.types';

/**
 * Render the Label component
 */
export const renderLabel = (state: LabelState, slots: LabelSlotsType) => {
    const labelContent = slots.default?.() || state.label;
    const requiredIndicatorContent = slots.requiredIndicator?.() || (state.requiredIndicator && '*');

    return h('label', {
        ...state.root,
        for: state.for,
        id: state.root.id || state.id,
    }, [
        labelContent,
        requiredIndicatorContent && h('span', {
            ...state.requiredIndicator,
            'aria-hidden': 'true',
        }, requiredIndicatorContent),
    ].filter(Boolean));
};
