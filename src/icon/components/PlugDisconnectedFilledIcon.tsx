import createSvgIcon from "../utils/createSvgIcon";

const PlugDisconnectedFilledIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      class={classes?.svg}
      focusable="false"
    >
      <path
        d="M43.63 4.37c.5.48.5 1.28 0 1.76l-4.91 4.92a9.25 9.25 0 0 1-.74 12.24l-3.35 3.34c-.48.5-1.28.5-1.76 0l-11.5-11.5a1.25 1.25 0 0 1 0-1.76l3.34-3.35a9.25 9.25 0 0 1 12.24-.74l4.92-4.91a1.25 1.25 0 0 1 1.76 0ZM9.28 36.95l-4.91 4.92a1.25 1.25 0 0 0 1.76 1.76l4.92-4.91a9.25 9.25 0 0 0 12.24-.74l3.34-3.35c.5-.48.5-1.28 0-1.76l-1.36-1.37 3.36-3.37a1.25 1.25 0 0 0-1.76-1.76l-3.37 3.36-5.23-5.23 3.36-3.37a1.25 1.25 0 0 0-1.76-1.76l-3.37 3.36-1.37-1.36a1.25 1.25 0 0 0-1.76 0l-3.35 3.34a9.25 9.25 0 0 0-.74 12.24Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  displayName: "PlugDisconnectedFilledIcon",
});

export default PlugDisconnectedFilledIcon;
