
import { defineComponent, ref, SlotsType, computed } from 'vue';
import { renderInput } from './renderInput';
import { useInputStyles } from './useInputStyles.styles';
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
            // 应用样式到状态
            useInputStyles(inputState);
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
