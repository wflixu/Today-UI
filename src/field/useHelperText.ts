import type { HelperTextProps, HelperTextState } from './HelperText.types';

/**
 * Given user props, defines default props for HelperText, computes derived state, and returns processed state.
 * @param props - User provided props to HelperText component.
 */
export const useHelperText = (
    props: HelperTextProps,
): HelperTextState => {
    // 返回状态
    return {
        // Props 传递的状态
        text: props.text,
        disabled: props.disabled || false,
        validationState: props.validationState || 'none',

        // 元素配置
        root: {},
    };
};
