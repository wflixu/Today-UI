import React, {
    cloneElement,
    isValidElement,
    useEffect,
    useState
} from "react";
import {
    Placement,
    offset,
    flip,
    shift,
    autoUpdate,
    useFloating,
    useInteractions,
    useHover,
    useFocus,
    useRole,
    useDismiss,
    arrow
} from "@floating-ui/react-dom-interactions";

interface Props {
    label: string;
    placement?: Placement;
}

export const Tooltip: React.FC<Props> = ({
    children,
    label,
    placement = "top"
}) => {
    const [open, setOpen] = useState(false);

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

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useHover(context),
        useFocus(context),
        useRole(context, { role: "tooltip" }),
        useDismiss(context)
    ]);

    useEffect(() => {
        if (refs.reference.current && refs.floating.current && open) {
            return autoUpdate(refs.reference.current, refs.floating.current, update);
        }
    }, [refs.reference, refs.floating, update, open]);

    return (
        <>
            {isValidElement(children) &&
                cloneElement(children, getReferenceProps({ ref: reference }))}
            {open && (
                <div
                    {...getFloatingProps({
                        ref: floating,
                        className: "Tooltip",
                        style: {
                            position: strategy,
                            top: y ?? "",
                            left: x ?? ""
                        }
                    })}
                >
                    {label}
                </div>
            )}
        </>
    );
};
