
import { computed, defineComponent, onMounted, ref } from "vue";
import { useFloating, offset, flip, shift, type Placement } from "use-floating";
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

        const { x, y, floating, reference } = useFloating({
            placement: props.placement,
            strategy: 'fixed',
            middleware: [flip(), offset(props.offset), shift()],
        });

        const tipStyle = computed(() => {
            return {
                top: `${y.value}px`,
                left: `${x.value}px`,
                display: open.value ? 'block' : 'block'
            }
        })
        const onClick = () => {
            open.value = true;
        }

        const onMouseleave = () => {
            open.value = false;
        }
        function handleOpen(context: { trigger: string }) {
            console.warn(context);
            open.value = true;
            
        }
        onMounted(() => {
            console.log('mounted');

            console.log(defaultContent[0].el);
            reference(defaultContent[0].el as Element);
            on(triggerEl.value, 'mouseenter', () => handleOpen({ trigger: 'trigger-element-hover' }));

        })
        const forwardRef = (ref: HTMLElement) => {
            console.warn('forwardRef',ref);
            
            reference(ref);
            triggerEl.value = ref;
        }

        return {
            tipStyle,

            reference,
            floating,
            forwardRef
        }
    },


    render() {
        const { tipStyle, reference, floating, forwardRef } = this;
        return (
            <Container
                ref="containerRef"
                forwardRef={(ref) => forwardRef(ref)}
            >
                {{
                    content: () => (
                        <div ref={floating} class="t-tooltip-content" style={{
                            ...tipStyle.value,
                        }}>
                            {props.label}
                        </div>
                    ),
                    default: () => renderContent(this, 'default', 'triggerElement'),
                }}
            </Container>
        )
    }

})