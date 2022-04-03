import { useId } from "@floating-ui/react-dom-interactions";
import { Dialog } from "../compoents/Dialog";

export default function DialogPlay() {
    const id = useId();
    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;
    return (
      <div className="DialogPlay">
        <h1>Floating UI Modal Dialog</h1>
        <Dialog
          render={({ close, labelId, descriptionId }) => (
            <>
              <h1 id={labelId}>This is a dialog!</h1>
              <p id={descriptionId}>
                Now that we've got your attention, you can close this.
              </p>
              <button onClick={close}>Close</button>
            </>
          )}
        >
          <button>Open dialog</button>
        </Dialog>
      </div>
    );
  }