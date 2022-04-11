
import { computed, defineComponent, onMounted, ref, toRef, toRefs, unref } from "vue";
import { useFloating, Placement, offset, flip, shift } from "../../../use-floating/src/index";

import './tooltip.css';
export default defineComponent({
    name: "TTooltip",
    props: {
        label: {
            type: String,
            default: "default tip content"
        }
    },
    setup(props, { slots }) {
        console.log(slots)
        let defaultContent = slots.default();
        const open = ref(false);
        const { x, y, floating, reference } = useFloating({
            placement: 'top',
            strategy: 'fixed',
            middleware: [flip(), offset(0), shift()],
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

        return () => {

            return (
                <>
                    <div ref={reference}  onMouseover={onClick} onMouseout={onMouseleave} className="t-tooltip">{defaultContent} </div>
                    <div ref={floating} className="t-tooltip-content" style={{
                        ...tipStyle.value,
                    }}>
                        {props.label}
                    </div>
                </>

            )
        }
    }
})