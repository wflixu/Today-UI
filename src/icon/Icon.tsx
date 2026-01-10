import { computed, defineComponent, toRefs, type PropType, unref } from "vue";
import { ICONS } from "./icons";

export default defineComponent({
  name: "TIcon",
  props: {
    name: String as PropType<string>,
    size: {
      type: [Number, String] as PropType<number | string>,
      default: undefined,
    },
    color: String,
  },
  setup(props, { attrs }) {
    const { name, size, color } = toRefs(props);

    // 计算图标组件
    const iconComponent = computed(() => {
      const value = unref(name);
      if (!value) {
        return null;
      }
      // 将 kebab-case 转换为组件键名
      const iconName = value.toLowerCase();
      return ICONS[iconName as keyof typeof ICONS] || null;
    });

    return () => {
      const IconComp = iconComponent.value;
      if (!IconComp) {
        // 如果找不到图标，显示占位符
        return (
          <span class="t-icon t-icon--not-found" {...attrs}>
            ?
          </span>
        );
      }

      // 直接渲染图标组件，传递所有 props 和 attrs
      // 图标组件自身会渲染 <span class="t-icon">
      return <IconComp size={size.value} color={color.value} {...attrs} />;
    };
  },
});
