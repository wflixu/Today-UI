
import { renderButton } from './renderButton';
import { useButtonClasses, type ButtonAppearance, type ButtonSize, type ButtonShape } from './useButtonClasses';
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

      // 使用纯 CSS 类名 Hook
      const classes = useButtonClasses({
        appearance: props.appearance as ButtonAppearance,
        size: props.size as ButtonSize,
        shape: props.shape as ButtonShape,
        disabled: props.disabled,
        loading: props.loading,
        iconOnly: props.iconOnly,
      });

      // 应用类名到状态
      if (buttonState.root) {
        buttonState.root.className = classes;
      }

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