import { ExtractPropTypes, PropType, Slot, VNode } from 'vue';

export type LabelSize = 'small' | 'medium' | 'large';
export type LabelWeight = 'normal' | 'semibold' | 'bold';

// Props 定义
export const labelProps = {
    /**
     * The label content (can also use default slot)
     */
    label: {
        type: String,
        default: undefined as undefined
    },

    /**
     * Associates the label with a form control
     */
    for: {
        type: String,
        default: undefined as undefined
    },

    /**
     * Indicates that the form control is required
     *
     * @default false
     */
    required: {
        type: Boolean,
        default: false
    },

    /**
     * Indicates that the label is disabled
     *
     * @default false
     */
    disabled: {
        type: Boolean,
        default: false
    },

    /**
     * A label supports different sizes.
     *
     * @default 'medium'
     */
    size: {
        type: String as PropType<LabelSize>,
        default: 'medium'
    },

    /**
     * Font weight variant
     *
     * @default 'semibold'
     */
    weight: {
        type: String as PropType<LabelWeight>,
        default: 'semibold'
    },

    /**
     * The label element's id
     */
    id: {
        type: String,
        default: undefined as undefined
    },
};

// 提取 Props 类型
export type LabelProps = ExtractPropTypes<typeof labelProps>;

// 插槽类型定义
export type LabelSlots = {
    /**
     * Custom label content (takes priority over label prop)
     */
    default?: Slot;

    /**
     * Custom required indicator
     */
    requiredIndicator?: Slot;
};

// 状态接口
export interface LabelState {
    /**
     * The label content
     */
    label?: string;

    /**
     * Associates the label with a form control
     */
    for?: string;

    /**
     * Indicates that the form control is required
     */
    required: boolean;

    /**
     * Indicates that the label is disabled
     */
    disabled: boolean;

    /**
     * A label supports different sizes.
     */
    size: NonNullable<LabelProps['size']>;

    /**
     * Font weight variant
     */
    weight: NonNullable<LabelProps['weight']>;

    /**
     * The label element's id
     */
    id?: string;

    /**
     * Root element configuration for rendering.
     */
    root: Record<string, any>;

    /**
     * The required indicator element attributes.
     */
    requiredIndicator?: Record<string, any>;
}

export type LabelSlotsType = SlotsType<LabelSlots>;
