import { h, Fragment, type VNode } from 'vue';
import TPortal from '../portal/Portal';
import TButton from '../button/Button';
import { useDialogClasses } from './useDialogClasses';
import type { DialogSlots, DialogState } from './Dialog.types';
import type { UsePopoverTriggerReturn } from '../popover/usePopoverTrigger';

export interface RenderDialogContext {
  state: DialogState;
  attach: unknown;
  disabled: boolean;
  lockScroll: boolean;
  onOverlayClick: (event: MouseEvent) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * 渲染 Dialog。
 *
 * 结构：触发元素 + Portal(遮罩 > 对话框 > 头部/内容/操作)
 *
 * 显示时才渲染，而非像迁移前那样常驻 DOM 再切 `display` ——
 * 后者会在页面里留下一个隐藏的对话框节点。
 */
export const renderDialog = (
  ctx: RenderDialogContext,
  slots: DialogSlots,
  wrapTrigger: UsePopoverTriggerReturn['wrapTrigger'],
): VNode => {
  const { state } = ctx;
  const classes = useDialogClasses({ size: state.size });

  const triggerChildren = slots.default?.() ?? [];
  const trigger = wrapTrigger(Array.isArray(triggerChildren) ? triggerChildren : [triggerChildren]);

  // 宽度按数值传给 CSS，避免注入任意字符串
  const rootStyle = { width: state.resolvedWidth, maxWidth: '100%' };

  const dialog = h(
    'div',
    {
      class: classes.overlay,
      style: { zIndex: 'var(--t-z-index-dialog)' },
      onClick: ctx.onOverlayClick,
    },
    [
      h('div', { class: classes.root, style: rootStyle }, [
        h('div', { class: classes.body }, [
          h('div', { class: classes.header }, slots.header?.() ?? state.title),
          h('div', { class: classes.content }, slots.content?.()),
          h(
            'div',
            { class: classes.actions },
            slots.actions?.() ?? [
              h(TButton, { onClick: ctx.onCancel }, () => '取消'),
              h(TButton, { appearance: 'primary', onClick: ctx.onConfirm }, () => '确认'),
            ],
          ),
        ]),
      ]),
    ],
  );

  return h(Fragment, [
    trigger,
    state.show
      ? h(
          TPortal,
          {
            attach: ctx.attach as never,
            disabled: ctx.disabled,
            lockScroll: ctx.lockScroll,
          },
          () => dialog,
        )
      : null,
  ]);
};
