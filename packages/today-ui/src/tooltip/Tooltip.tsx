import { Placement } from "@floating-ui/dom";
import { defineComponent, ref } from "vue";
import { useFloating } from "use-floating";
interface Props {
    label: string;
    placement?: Placement;
}
export default defineComponent({
    name: "TTooltip",
    setup(props, ctx) {
        const open = ref(false);
        const {
            x,
            y,
            reference,
            floating,
            strategy,
            context,
            refs,
            update
        } = useFloating({
            placement,
            open,
            onOpenChange: setOpen,
            middleware: [offset(5), flip(), shift({ padding: 8 })]
        });

        return () => {
            return (
                <h1>tooltip</h1>
            )
        }
    }
})