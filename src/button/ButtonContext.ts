import { inject, provide, type Ref } from 'vue';
import type { ButtonSize } from './Button.types';

/**
 * @internal
 * Internal context value used to update default values between internal components
 */
export interface ButtonContextValue {
    size?: Ref<ButtonSize | undefined>;
}

// 创建唯一的注入键
export const ButtonContextKey = Symbol('ButtonContext');

/**
 * @internal
 * Internal context provider used to update default values between internal components
 */
export const useButtonContextProvider = (value: ButtonContextValue) => {
    provide(ButtonContextKey, value);
};

/**
 * @internal
 * Internal context hook used to update default values between internal components
 */
export const useButtonContext = (): ButtonContextValue => {
    const context = inject(ButtonContextKey, undefined) as ButtonContextValue | undefined;
    // 如果没有提供 Context，返回 undefined
    return context ?? {};
};