import { ExtractPropTypes, PropType, Slot } from 'vue';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonAppearance = 'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent';

// Props 定义
export const buttonProps = {
    /**
     * A button can have its content and borders styled for greater emphasis or to be subtle.
     * - 'secondary' (default): Gives emphasis to the button in such a way that it indicates a secondary action.
     * - 'primary': Emphasizes the button as a primary action.
     * - 'outline': Removes background styling.
     * - 'subtle': Minimizes emphasis to blend into the background until hovered or focused.
     * - 'transparent': Removes background and border styling.
     *
     * @default 'secondary'
     */
    appearance: {
        type: String as PropType<ButtonAppearance>,
        default: 'secondary'
    },

    /**
     * @deprecated Use 'appearance' prop instead. This prop is kept for backward compatibility.
     */
    type: {
        type: String as PropType<ButtonAppearance>,
        default: undefined as undefined,
        validator: (value: string) => {
            if (value) {
                console.warn('[Today-UI Button]: "type" prop is deprecated. Use "appearance" instead.');
            }
            return true;
        }
    },

    /**
     * When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it
     * is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this
     * pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.
     *
     * @default false
     */
    disabledFocusable: {
        type: Boolean,
        default: false
    },

    /**
     * A button can show that it cannot be interacted with.
     *
     * @default false
     */
    disabled: {
        type: Boolean,
        default: false
    },

    /**
     * A button can format its icon to appear before or after its content.
     *
     * @default 'before'
     */
    iconPosition: {
        type: String as PropType<'before' | 'after'>,
        default: 'before'
    },

    /**
     * A button can be rounded, circular, or square.
     *
     * @default 'rounded'
     */
    shape: {
        type: String as PropType<'rounded' | 'circular' | 'square'>,
        default: 'rounded'
    },

    /**
     * A button supports different sizes.
     *
     * @default 'medium'
     */
    size: {
        type: String as PropType<ButtonSize>,
        default: 'medium'
    },

    /**
     * The element type to render as (button or a)
     *
     * @default 'button'
     */
    as: {
        type: String,
        default: 'button'
    },

    /**
     * Click event handler
     */
    onClick: {
        type: Function as PropType<(event: MouseEvent) => void>,
        default: undefined as undefined
    },

    /**
     * 显示加载状态，禁用按钮并显示 Spinner
     *
     * @default false
     */
    loading: {
        type: Boolean,
        default: false
    },

    /**
     * 加载时的文本提示
     */
    loadingText: {
        type: String,
        default: undefined as undefined
    },
};

// 提取 Props 类型
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

// 插槽类型定义
export type ButtonSlots = {


    /**
     * Icon that renders either before or after the `children` as specified by the `iconPosition` prop.
     */
    icon?: Slot;

    /**
     * Default slot for button content
     */
    default?: Slot;
};

// 状态接口
export interface ButtonState {
    /**
     * A button can have its content and borders styled for greater emphasis or to be subtle.
     */
    appearance: NonNullable<ButtonProps['appearance']>;

    /**
     * When set, allows the button to be focusable even when it has been disabled.
     */
    disabledFocusable: NonNullable<ButtonProps['disabledFocusable']>;

    /**
     * A button can show that it cannot be interacted with.
     */
    disabled: NonNullable<ButtonProps['disabled']>;

    /**
     * A button can format its icon to appear before or after its content.
     */
    iconPosition: NonNullable<ButtonProps['iconPosition']>;

    /**
     * A button can be rounded, circular, or square.
     */
    shape: NonNullable<ButtonProps['shape']>;

    /**
     * A button supports different sizes.
     */
    size: NonNullable<ButtonProps['size']>;

    /**
     * A button can contain only an icon.
     */
    iconOnly: boolean;

    /**
     * The icon element attributes.
     */
    icon?: Record<string, any>;

    /**
     * Root element configuration for rendering.
     */
    root: Record<string, any>;

    /**
     * The element type to render as (button, a, etc.)
     */
    as: NonNullable<ButtonProps['as']>;

    /**
     * Whether the button is in loading state
     */
    loading: boolean;

    /**
     * Loading text to display
     */
    loadingText?: string;

    /**
     * Whether to show the spinner
     */
    showSpinner: boolean;
}