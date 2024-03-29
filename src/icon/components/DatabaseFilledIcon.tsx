import createSvgIcon from "../utils/createSvgIcon";

const DatabaseFilledIcon = createSvgIcon({
  svg: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      class="svg"
      focusable="false"
    >
      <path
        d="M16 14c3.26 0 6.3-.6 8.6-1.64.83-.38 1.67-.87 2.4-1.48V25c0 2.76-4.92 5-11 5S5 27.76 5 25V10.88c.73.61 1.57 1.1 2.4 1.48A21.33 21.33 0 0 0 16 14ZM5 7c0-2.76 4.92-5 11-5s11 2.24 11 5-4.92 5-11 5S5 9.76 5 7Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  displayName: "DatabaseFilledIcon",
});

export default DatabaseFilledIcon;
