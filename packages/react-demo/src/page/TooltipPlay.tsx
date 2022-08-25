import { Tooltip } from "../compoents/Tooltip";

export default function TooltipPlay() {
  return (
    <>
      <h2>Tooltip</h2>
      <Tooltip label="My tooltip">
        <button>Hover me</button>
      </Tooltip>
    </>
  );
}
