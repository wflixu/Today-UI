export type CSSSelector = string;
export type AttachNodeReturnValue = HTMLElement | Element | Document;
export type AttachNode = CSSSelector | ((triggerNode?: HTMLElement) => AttachNodeReturnValue);