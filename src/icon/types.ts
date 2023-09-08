export type SvgIconCreateFnParams = {
  svg: (params: { classes?: Record<string, string> }) => JSX.Element;
  displayName: string;
};
