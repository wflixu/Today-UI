
import { computed, defineComponent, onMounted, ref } from "vue";
import { useFloating, offset, flip, shift, type Placement } from "use-floating";
import { renderTNodeJSX, renderContent } from '../shared/render-tnode';
import Container from './container';
import props from "./props";
import "./style"


export default defineComponent({
    name: "TTooltip",
    props,
    setup(props, { slots }) {

        let defaultContent = slots.default();
        const open = ref(false);
        
        const { x, y, floating, reference } = useFloating({
            placement: props.placement,
            strategy: 'fixed',
            middleware: [flip(), offset(props.offset), shift()],
        });

        const tipStyle = computed(() => {
            return {
                top: `${y.value}px`,
                left: `${x.value}px`,
                display: open.value ? 'block' : 'none'
            }
        })
        const onClick = () => {
            open.value = true;
        }

        const onMouseleave = () => {
            open.value = false;
        }

        onMounted(() => {
            console.log('mounted');

            console.log(defaultContent[0].el);
            reference(defaultContent[0].el as Element);
        })

        return {
            tipStyle,

            reference,
            floating,
        }
    },


    render() {
        const { tipStyle, reference, floating } = this;
        return (
            <Container
                ref="containerRef"
                forwardRef={(ref) => reference(ref)}
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