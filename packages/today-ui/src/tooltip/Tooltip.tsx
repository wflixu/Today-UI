
import { computed, defineComponent, onMounted, ref } from "vue";
import { useFloating, offset, flip, shift, type Placement } from "use-floating";
import props from "./props";

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

        return () => {

            return (
                <>
                    <div onMouseover={onClick} onMouseout={onMouseleave} class="t-tooltip">{defaultContent} </div>
                    <div ref={floating} class="t-tooltip-content" style={{
                        ...tipStyle.value,
                    }}>
                        {props.label}
                    </div>
                </>

            )
        }
    }

})