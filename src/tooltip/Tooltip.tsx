// @ts-nocheck
import { computed, defineComponent, onMounted, ref, render, unref } from "vue";
import {
  useFloating,
  offset,
  flip,
  shift,
  type Placement,
  arrow,
} from "@floating-ui/vue";
import { renderTNodeJSX, renderContent } from "../shared/render-tnode";
import Container from "./container";
import props from "./props";
import { on } from "../shared/dom";
import "./style/tooltip.css";

export default defineComponent({
  name: "TTooltip",
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const open = ref(false);
    const reference = ref<HTMLElement>(null);
    const floating = ref<HTMLElement>(null);
    const arrowEl = ref<HTMLElement>(null);

    const { x, y, middlewareData, update } = useFloating(reference, floating, {
      placement: props.placement,
      middleware: [
        flip(),
        shift(),
        offset(props.offset),
        arrow({
          element: arrowEl,
        }),
      ],
    });

    const tipStyle = computed(() => {

      return {
        top: `${y.value}px`,
        left: `${x.value}px`,
        display: open.value ? "block" : "none",
      };
    });

    const arrowStyle = computed(() => {
      const { x, y } = middlewareData.value.arrow ?? { x: 0, y: 0 };

      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[props.placement.split("-")[0]] as string;

      return {
        left: x ? `${x}px` : "",
        top: y ? `${y}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "-4px",
      };
    });

    function handleOpen(_context: { trigger: string }) {
      open.value = true;
    }
    function handleClose(_context: { trigger: string }) {
      open.value = false;
    }

    onMounted(() => {
      on(reference.value, "mouseenter", () =>
        handleOpen({ trigger: "trigger-element-hover" })
      );
      on(reference.value, "mouseleave", () =>
        handleClose({ trigger: "trigger-element-hover" })
      );
    });

    const forwardRef = (ref: HTMLElement) => {
      reference.value = ref;
    };

    const setArrowRef = (ref: HTMLElement) => {
      if (ref === arrowEl.value) return;

      arrowEl.value = ref;
    };
    const setReferenceRef = (ref: HTMLElement) => {
      if (ref === reference.value) {
        return;
      } else {
        reference.value = ref;
        update();
      }
    };

    const setFloatingRef = (ref: HTMLElement) => {
      if (ref === floating.value) {
        return;
      }
      floating.value = ref;
      update();
    };

    return {
      tipStyle,
      arrowStyle,
      reference,
      floating,
      open,
      arrowEl,
      setArrowRef,
      setReferenceRef,
      setFloatingRef,
      forwardRef,
    };
  },
  render() {
    const {
      tipStyle,
      arrowStyle,
      forwardRef,
      open,
      arrowEl,
      setArrowRef,
      setFloatingRef,
    } = this;
    const content = renderTNodeJSX(this, "label");
    return (
      <Container
        ref="containerRef"
        forwardRef={(ref) => forwardRef(ref)}
        onContentMounted={(el) => {
          
        }}
        visible={open}
      >
        {{
          content: () => (
            <div
              ref={setFloatingRef}
              class="t-tooltip-content"
              style={tipStyle}
            >
              {content}
              <div
                class="t-tooltip-arrow"
                ref={setArrowRef}
                style={arrowStyle}
              />
            </div>
          ),
          default: () => renderContent(this, "default", "triggerElement"),
        }}
      </Container>
    );
  },
});
