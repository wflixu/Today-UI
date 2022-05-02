import type { PropType, ExtractPropTypes } from 'vue';

import type { Placement } from 'use-floating';

export interface TTooltipProps {
    placement: Placement;
}

export default {
    placement: {
        type: String as PropType<TTooltipProps['placement']>,
        default: 'top'
    },
    label: {
        type: String,
        default: "default tip content"
    },
    offset: {
        type: Number,
        default: 0
    }
}
