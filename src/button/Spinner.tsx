/**
 * Spinner Component
 * 用于显示加载状态的旋转动画
 */

import { defineComponent, PropType } from 'vue';
import { useSpinnerStyles } from './useSpinnerStyles';

export const Spinner = defineComponent({
  name: 'Spinner',
  props: {
    size: {
      type: String as PropType<'tiny' | 'small' | 'medium' | 'large'>,
      default: 'small',
    },
  },
  setup(props) {
    const styles = useSpinnerStyles();

    return () => (
      <div class={styles.root}>
        <svg
          class={styles.svg}
          viewBox="0 0 24 24"
          width={props.size === 'tiny' ? '16' : props.size === 'small' ? '20' : props.size === 'medium' ? '24' : '28'}
          height={props.size === 'tiny' ? '16' : props.size === 'small' ? '20' : props.size === 'medium' ? '24' : '28'}
        >
          <circle class={styles.circle} cx="12" cy="12" r="10" />
        </svg>
      </div>
    );
  },
});

export default Spinner;
