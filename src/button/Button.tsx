
import { renderButton_unstable } from './renderButton';
import { useButtonStyles_unstable } from './useButtonStyles.styles';
import { buttonProps, type ButtonProps, type ButtonSize, type ButtonSlots } from './Button.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { defineComponent, PropType, ref, SlotsType } from 'vue';
import { useButton } from './useButton';
// import { renderButton } from './renderButton';
// import { useButtonStyles } from './useButtonStyles';
// import type { ButtonProps } from './Button.types';
// import { useCustomStyleHook } from '@fluentui/vue-shared-contexts';

export const Button = defineComponent({
  name: 'Button',
  props: buttonProps,
  slots: Object as SlotsType<ButtonSlots>,
  setup(props: ButtonProps, { expose, slots }) {
    const rootRef = ref<HTMLElement | null>(null);
    const state = useButton(props);

    useButtonStyles(state);
    useCustomStyleHook('useButtonStyles')(state);

    expose({
      // 暴露可能需要的方法或属性
    });

    return () => renderButton(state);
  }
});