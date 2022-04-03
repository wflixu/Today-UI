import { FloatingOverlay, FloatingPortal, useClick, useDismiss, useFloating, useFocusTrap, useId, useInteractions, useRole } from '@floating-ui/react-dom-interactions';
import React, { cloneElement, isValidElement, useState } from 'react';
import './dialog.css';

interface Props {
    open?: boolean;
    render: (props: {
        close: () => void;
        labelId: string;
        descriptionId: string;
    }) => React.ReactNode;
}

export const Dialog: React.FC<Props> = ({
    children,
    render,
    open: passedOpen = false
}) => {
    const [open, setOpen] = useState(passedOpen);

    const { reference, floating, context } = useFloating({
        open,
        onOpenChange: setOpen
    });

    const id = useId();
    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useClick(context),
        useFocusTrap(context),
        useRole(context),
        useDismiss(context)
    ]);

    return (
        <>
            {isValidElement(children) &&
                cloneElement(children, getReferenceProps({ ref: reference }))}
            <FloatingPortal>
                {open && (
                    <FloatingOverlay
                        lockScroll
                        style={{
                            display: "grid",
                            placeItems: "center",
                            background: "rgba(25, 25, 25, 0.8)",
                            backdropFilter: "blur(12px)"
                        }}
                    >
                        <div
                            {...getFloatingProps({
                                ref: floating,
                                className: "Dialog",
                                "aria-labelledby": labelId,
                                "aria-describedby": descriptionId
                            })}
                        >
                            {render({
                                close: () => setOpen(false),
                                labelId,
                                descriptionId
                            })}
                        </div>
                    </FloatingOverlay>
                )}
            </FloatingPortal>
        </>
    );
};