import createSvgIcon from "../utils/createSvgIcon";

const DismissFilled = createSvgIcon({
  svg: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      class="svg"
      focusable="false"
    >
      <path d="m3.9 4.05.07-.08a.75.75 0 0 1 .98-.07l.08.07L10 8.94l4.97-4.97a.75.75 0 0 1 .98-.07l.08.07c.27.27.3.68.07.98l-.07.08L11.06 10l4.97 4.97c.27.27.3.68.07.98l-.07.08a.75.75 0 0 1-.98.07l-.08-.07L10 11.06l-4.97 4.97a.75.75 0 0 1-.98.07l-.08-.07a.75.75 0 0 1-.07-.98l.07-.08L8.94 10 3.97 5.03a.75.75 0 0 1-.07-.98l.07-.08-.07.08Z" fill="currentColor"></path>

    </svg>
  ),
  displayName: "DismissFilled",
});

export default DismissFilled;
