import createSvgIcon from "../utils/createSvgIcon";

const SpinnerFilledIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      class={classes?.svg}
      focusable="false"
    >
      <path
        d="M2.5 8A5.5 5.5 0 1 1 8 13.5.75.75 0 0 0 8 15a7 7 0 1 0-7-7 .75.75 0 0 0 1.5 0Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  displayName: "SpinnerFilledIcon",
});

export default SpinnerFilledIcon;
