
import { computed, defineComponent, onMounted, ref } from "vue";
import { useFloating, offset, flip, shift, type Placement, arrow } from "../../../use-floating/src/index";
import { renderTNodeJSX, renderContent } from '../shared/render-tnode';
import Container from './container';
import props from "./props";
import "./style"
import { on } from "../shared/dom";


export default defineComponent({
    name: "TTooltip",
    props,
    setup(props, { slots }) {

        let defaultContent = slots.default();
        const open = ref(false);

        const triggerEl = ref<HTMLElement>(null);
        const arrowEl = ref<HTMLElement>(null);

        const { x, y, floating, reference, middlewareData, update } = useFloating({
            placement: props.placement,
            strategy: 'fixed',
            middleware: [flip(), offset(props.offset), shift(), arrow({
                element: arrowEl,
            })],
        });

        const tipStyle = computed(() => {


            return {
                top: `${y.value}px`,
                left: `${x.value}px`,
                display: open.value ? 'block' : 'none'
            }
        })
        const arrowPosition = computed(() => {
            console.warn('arrowPosition', middlewareData?.arrow);
            debugger;
            return middlewareData?.arrow;
        })


        const onClick = () => {
            open.value = true;
        }

        const onMouseleave = () => {
            open.value = false;
        }
        function handleOpen(_context: { trigger: string }) {

            open.value = true;

        }
        function handleClose(context: { trigger: string }) {

            open.value = false;

        }
        onMounted(() => {
            console.log('mounted');
            on(triggerEl.value, 'mouseenter', () => handleOpen({ trigger: 'trigger-element-hover' }));
            on(triggerEl.value, 'mouseleave', () => handleClose({ trigger: 'trigger-element-hover' }));

        })
        const forwardRef = (ref: HTMLElement) => {

            reference(ref);
            triggerEl.value = ref;
        }

        const setArrowRef = (ref: HTMLElement) => {
            console.warn('setArrowRef', ref);
            arrowEl.value = ref;
            update();
        }

        return {
            tipStyle,
            arrowEl,
            open,
            arrowPosition,
            setArrowRef,
            reference,
            floating,
            forwardRef,
        }
    },


    render() {
        const { tipStyle, reference, floating, forwardRef, open, arrowEl, setArrowRef, arrowPosition } = this;
        const content = renderTNodeJSX(this, 'label');


        return (
            <Container
                ref="containerRef"
                forwardRef={(ref) => forwardRef(ref)}
                onContentMounted={
                    (el) => {
                        console.log('onContentMounted', el);

                    }
                }
                visible={open}
            >
                {{
                    content: () => (
                        <div ref={floating} class="t-tooltip-content" style={tipStyle}>
                            {content}
                            {arrowPosition}
                            <div ref={setArrowRef} class="t-tooltip-arrow">
                                test
                            </div>
                        </div>
                    ),
                    default: () => renderContent(this, 'default', 'triggerElement'),
                }}
            </Container>
        )
    }

})