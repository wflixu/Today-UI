import {
    useFloating,
    useInteractions,
    useHover,
    useFocus,
    useRole,
    safePolygon,
    useDismiss,
    autoUpdate,
    useClick,

} from '@floating-ui/react-dom-interactions';
import { useEffect, useState } from 'react';



export function Interactions() {
    const [open, setOpen] = useState(false);
    const { context, reference, floating, strategy, x, y, refs, update } = useFloating({
        placement:'bottom',
        open,
        onOpenChange: setOpen,
    });
    
    const { getReferenceProps, getFloatingProps } = useInteractions([
        useHover(context),
        useClick(context),
        // useFocus(context, props),
        // useRole(context, props),
        // useDismiss(context),
    ]);

    useEffect(() => {
        if (refs.reference.current && refs.floating.current && open) {
            return autoUpdate(refs.reference.current, refs.floating.current, update);
        }
    }, [refs.reference, refs.floating, update, open]);


    return (
        <>
            <button {...getReferenceProps({ ref: reference })}>
                My button
            </button>
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
                 tipcontent ....
                </div>
            )}
        </>
    )
}