import { useFloating, shift, autoUpdate } from '@floating-ui/react-dom';
import { useEffect, useMemo, useState } from 'react';


export function Floating() {
    const [open, setOpen] = useState(true);
    const { x, y, reference, floating, strategy } = useFloating({
        open,
        onOpenChange: setOpen,
    });

    const toggle = () => setOpen(!open);
    return (
        <>
            <button onClick={toggle} ref={reference}>Button</button>
            {open && (
                <div
                    ref={floating}
                    style={{
                        position: strategy,
                        top: y ?? '',
                        left: x ?? '',
                    }}
                >
                    Tooltip
                </div>
            )}
        </>
    )
}