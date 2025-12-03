
import { renderButton } from './renderButton';
import { useButtonStyles } from './useButtonStyles.styles';
import { buttonProps, type ButtonProps, type ButtonSlots } from './Button.types';
import './button.css';

import { defineComponent, ref, SlotsType } from 'vue';
import { useButton } from './useButton';

export const Button = defineComponent({
  name: 'Button',
  props: buttonProps,
  slots: Object as SlotsType<ButtonSlots>,
  setup(props: ButtonProps, { expose, slots }) {
    const rootRef = ref<HTMLElement | null>(null);

    // 创建按钮状态
    const state = useButton(props);

    // 应用样式
    useButtonStyles(state);

    // 暴露可能需要的方法或属性
    expose({
      rootRef,
    });

    // 返回渲染函数
    return () => renderButton(state, slots);
  }
});

export default Button;