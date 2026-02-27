
import { defineComponent, ref, SlotsType, computed } from 'vue';
import { renderInput } from './renderInput';
import { useInputClasses, inputClassNames } from './useInputClasses';
import { inputProps, type InputProps, type InputSlots } from './Input.types';
import { useInput } from './useInput';
import './input.css';

export const Input = defineComponent({
    name: 'Input',
    props: inputProps,
    slots: Object as SlotsType<InputSlots>,
    emits: ['update:modelValue'],
    setup(props: InputProps, { expose, slots, emit }) {
        const rootRef = ref<HTMLElement | null>(null);

        // 非受控模式的内部值（需要在 setup 中创建以保持持久性）
        const internalValue = ref(props.defaultValue ?? '');
        // 密码可见性状态
        const isPasswordVisible = ref(false);

        // 使用 computed 创建响应式状态
        const state = computed(() => {
            const inputState = useInput(props, slots, internalValue, isPasswordVisible, emit);

            // 使用纯 CSS 类名 Hook
            const classes = useInputClasses({
                appearance: inputState.appearance,
                size: inputState.size,
                disabled: inputState.disabled,
                error: inputState.error,
                readonly: inputState.readonly,
                validationState: inputState.validationState,
            });

            // 应用类名到状态
            if (inputState.root) {
                inputState.root.className = classes.root;
            }

            if (inputState.input) {
                const inputClasses = [classes.input];
                if (classes.inputValidation) {
                    inputClasses.push(classes.inputValidation);
                }
                inputState.input = {
                    ...inputState.input,
                    className: inputClasses.join(' '),
                };
            }

            if (inputState.contentBefore) {
                inputState.contentBefore = {
                    ...inputState.contentBefore,
                    className: classes.contentBefore || '',
                };
            }

            if (inputState.contentAfter) {
                inputState.contentAfter = {
                    ...inputState.contentAfter,
                    className: classes.contentAfter || '',
                };
            }

            if (inputState.clearButton) {
                inputState.clearButton = {
                    ...inputState.clearButton,
                    className: classes.clearButton || '',
                };
            }

            if (inputState.passwordToggleButton) {
                inputState.passwordToggleButton = {
                    ...inputState.passwordToggleButton,
                    className: classes.passwordToggleButton || '',
                };
            }

            if (inputState.progressIndicator) {
                inputState.progressIndicator = {
                    ...inputState.progressIndicator,
                    className: classes.progressIndicator || '',
                };
            }

            return inputState;
        });

        // 暴露可能需要的方法或属性
        expose({
            rootRef,
        });

        // 返回渲染函数
        return () => renderInput(state.value, slots);
    }
});

export default Input;
