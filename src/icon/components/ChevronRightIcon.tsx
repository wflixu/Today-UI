import createSvgIcon from "../utils/createSvgIcon";

const ChevronRightIcon = createSvgIcon({
  svg: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048"
      class="svg"
      focusable="false"
    >
      <path d="M515 1955l930-931L515 93l90-90 1022 1021L605 2045l-90-90z" />
    </svg>
  ),
  displayName: "ChevronRightIcon",
});

export default ChevronRightIcon;
