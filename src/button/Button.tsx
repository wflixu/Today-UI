
import { renderButton } from './renderButton';
import { useButtonStyles } from './useButtonStyles.styles';
import { buttonProps, type ButtonProps, type ButtonSlots } from './Button.types';
import './button.css';

import { defineComponent, ref, SlotsType, computed } from 'vue';
import { useButton } from './useButton';

export const Button = defineComponent({
  name: 'Button',
  props: buttonProps,
  slots: Object as SlotsType<ButtonSlots>,
  setup(props: ButtonProps, { expose, slots }) {
    const rootRef = ref<HTMLElement | null>(null);

    // 使用 computed 创建响应式状态
    const state = computed(() => {
      const buttonState = useButton(props);
      // 应用样式到状态
      useButtonStyles(buttonState);
      return buttonState;
    });

    // 暴露可能需要的方法或属性
    expose({
      rootRef,
    });

    // 返回渲染函数
    return () => renderButton(state.value, slots);
  }
});

export default Button;