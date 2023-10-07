import type { PropType } from "vue";

type ButtonType = "default" | "primary" | "outline" | "subtle" | "transparent";
type ButtonShape = "rounded" | "circular" | "square";
type ButtonSize  = "small" | "medium" | "large";

export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: "default",
  },
  shape: {
    type: String as PropType<ButtonShape>,
    default: "rounded",
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: "medium",
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default:false
  }
};
