import type { InjectionKey, Ref } from "vue";

export const DIALOG_TRIGGER_TOKEN: InjectionKey<Ref> = Symbol("dialog-trigger");
