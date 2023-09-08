import createSvgIcon from "../utils/createSvgIcon";

const CubeTreeFilledIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class={classes?.svg}
      focusable="false"
    >
      <path
        d="M11.76 2.04a.75.75 0 0 1 .48 0l3.75 1.25c.3.1.51.39.51.71v5c0 .32-.2.6-.51.71l-3.24 1.08V13h1.75c1.24 0 2.25 1 2.25 2.25v.84a3 3 0 1 1-1.5 0v-.84a.75.75 0 0 0-.75-.75h-5a.75.75 0 0 0-.75.75v.84a3 3 0 1 1-1.5 0v-.84c0-1.24 1-2.25 2.25-2.25h1.75v-2.2L8.01 9.7A.75.75 0 0 1 7.5 9V4c0-.32.2-.6.51-.71l3.75-1.25ZM9.8 5.5c-.13.4.08.82.47.95l.99.33v.96a.75.75 0 0 0 1.5 0v-.96l.99-.33a.75.75 0 0 0-.48-1.42L12 5.46l-1.26-.42a.75.75 0 0 0-.95.47Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  displayName: "CubeTreeFilledIcon",
});

export default CubeTreeFilledIcon;
