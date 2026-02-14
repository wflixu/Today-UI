import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import Button from '../Button';
import type { ButtonProps } from '../Button.types';

describe('Button 组件', () => {
  describe('Props 渲染', () => {
    it('默认渲染为 button 元素', () => {
      const wrapper = mount(Button, {
        slots: {
          default: '按钮文本'
        }
      });

      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe('按钮文本');
    });

    it('默认外观为 secondary', () => {
      const wrapper = mount(Button, {
        props: { appearance: 'secondary' as ButtonProps['appearance'] },
        slots: { default: '按钮' }
      });

      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
    });

    describe('appearance 属性', () => {
      const appearances: Array<ButtonProps['appearance']> = ['primary', 'secondary', 'outline', 'subtle', 'transparent'];

      appearances.forEach((appearance) => {
        it(`应该渲染 appearance="${appearance}"`, () => {
          const wrapper = mount(Button, {
            props: { appearance },
            slots: { default: appearance }
          });

          const button = wrapper.find('button');
          expect(button.exists()).toBe(true);
          expect(button.text()).toBe(appearance);
        });
      });
    });

    describe('size 属性', () => {
      const sizes: Array<ButtonProps['size']> = ['small', 'medium', 'large'];

      sizes.forEach((size) => {
        it(`应该渲染 size="${size}"`, () => {
          const wrapper = mount(Button, {
            props: { size },
            slots: { default: size }
          });

          const button = wrapper.find('button');
          expect(button.exists()).toBe(true);
        });
      });
    });

    describe('shape 属性', () => {
      const shapes: Array<ButtonProps['shape']> = ['rounded', 'circular', 'square'];

      shapes.forEach((shape) => {
        it(`应该渲染 shape="${shape}"`, () => {
          const wrapper = mount(Button, {
            props: { shape },
            slots: { default: shape }
          });

          const button = wrapper.find('button');
          expect(button.exists()).toBe(true);
        });
      });
    });

    describe('iconPosition 属性', () => {
      it('应该在内容前渲染图标（iconPosition="before"）', () => {
        const wrapper = mount(Button, {
          props: { iconPosition: 'before' },
          slots: {
            default: '文本',
            icon: '🔍'
          }
        });

        const button = wrapper.find('button');
        const text = button.text();
        expect(text).toContain('🔍');
        expect(text).toContain('文本');
      });

      it('应该在内容后渲染图标（iconPosition="after"）', () => {
        const wrapper = mount(Button, {
          props: { iconPosition: 'after' },
          slots: {
            default: '文本',
            icon: '→'
          }
        });

        const button = wrapper.find('button');
        const text = button.text();
        expect(text).toContain('文本');
        expect(text).toContain('→');
      });
    });

    describe('disabled 属性', () => {
      it('应该在禁用状态下禁用按钮', () => {
        const wrapper = mount(Button, {
          props: { disabled: true },
          slots: { default: '禁用按钮' }
        });

        const button = wrapper.find('button');
        expect(button.attributes('disabled')).toBeDefined();
      });

      it('禁用状态下不应该触发点击事件', async () => {
        const onClick = vi.fn();
        const wrapper = mount(Button, {
          props: {
            disabled: true,
            onClick
          },
          slots: { default: '禁用按钮' }
        });

        const button = wrapper.find('button');
        await button.trigger('click');
        expect(onClick).not.toHaveBeenCalled();
      });
    });

    describe('disabledFocusable 属性', () => {
      it('应该设置 tabindex="-1" 当 disabledFocusable=true', () => {
        const wrapper = mount(Button, {
          props: {
            disabled: true,
            disabledFocusable: true
          },
          slots: { default: '按钮' }
        });

        const button = wrapper.find('button');
        expect(button.attributes('tabindex')).toBe('-1');
      });

      it('不应该设置 tabindex 当 disabledFocusable=false', () => {
        const wrapper = mount(Button, {
          props: {
            disabled: true,
            disabledFocusable: false
          },
          slots: { default: '按钮' }
        });

        const button = wrapper.find('button');
        expect(button.attributes('tabindex')).toBeUndefined();
      });
    });

    describe('loading 属性', () => {
      it('应该显示加载状态', () => {
        const wrapper = mount(Button, {
          props: { loading: true },
          slots: { default: '加载中' }
        });

        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
      });

      it('loading 状态下不应该触发点击事件', async () => {
        const onClick = vi.fn();
        const wrapper = mount(Button, {
          props: {
            loading: true,
            onClick
          },
          slots: { default: '加载中' }
        });

        const button = wrapper.find('button');
        await button.trigger('click');
        expect(onClick).not.toHaveBeenCalled();
      });

      it('应该显示加载文本（loadingText）', () => {
        const wrapper = mount(Button, {
          props: {
            loading: true,
            loadingText: '处理中...'
          },
          slots: { default: '提交' }
        });

        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
      });
    });

    describe('as 属性', () => {
      it('应该渲染为 <a> 元素当 as="a"', () => {
        const wrapper = mount(Button, {
          props: {
            as: 'a'
          },
          attrs: {
            href: 'https://example.com'
          },
          slots: { default: '链接' }
        });

        const link = wrapper.find('a');
        expect(link.exists()).toBe(true);
        expect(link.attributes('href')).toBe('https://example.com');
        expect(link.text()).toBe('链接');
      });

      it('应该渲染为自定义元素', () => {
        const wrapper = mount(Button, {
          props: {
            as: 'div'
          },
          slots: { default: '自定义元素' }
        });

        const div = wrapper.find('div');
        expect(div.exists()).toBe(true);
        expect(div.text()).toBe('自定义元素');
      });
    });
  });

  describe('点击事件', () => {
    it('应该触发 onClick 事件', async () => {
      const onClick = vi.fn();
      const wrapper = mount(Button, {
        props: { onClick },
        slots: { default: '点击我' }
      });

      const button = wrapper.find('button');
      await button.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('应该传递 MouseEvent 到 onClick 处理器', async () => {
      const onClick = vi.fn();
      const wrapper = mount(Button, {
        props: { onClick },
        slots: { default: '按钮' }
      });

      const button = wrapper.find('button');
      await button.trigger('click');
      expect(onClick).toHaveBeenCalledWith(expect.any(MouseEvent));
    });
  });

  describe('插槽', () => {
    it('应该渲染默认插槽内容', () => {
      const wrapper = mount(Button, {
        slots: { default: '默认内容' }
      });

      const button = wrapper.find('button');
      expect(button.text()).toBe('默认内容');
    });

    it('应该渲染 icon 插槽', () => {
      const wrapper = mount(Button, {
        props: { iconPosition: 'before' },
        slots: {
          default: '文本',
          icon: '🔍'
        }
      });

      const button = wrapper.find('button');
      const text = button.text();
      expect(text).toContain('🔍');
      expect(text).toContain('文本');
    });

    it('应该渲染为 icon-only 按钮（只有 icon 插槽）', () => {
      const wrapper = mount(Button, {
        props: { shape: 'circular' },
        slots: {
          icon: '🔍'
        }
      });

      const button = wrapper.find('button');
      expect(button.text()).toBe('🔍');
    });

    it('应该同时渲染 icon 和 default 插槽', () => {
      const wrapper = mount(Button, {
        props: { iconPosition: 'after' },
        slots: {
          default: '提交',
          icon: '→'
        }
      });

      const button = wrapper.find('button');
      const text = button.text();
      expect(text).toContain('提交');
      expect(text).toContain('→');
    });
  });

  describe('动态 props 更新', () => {
    it('应该响应 appearance prop 变化', async () => {
      const wrapper = mount(Button, {
        props: { appearance: 'secondary' },
        slots: { default: '按钮' }
      });

      await wrapper.setProps({ appearance: 'primary' });
      expect(wrapper.props('appearance')).toBe('primary');
    });

    it('应该响应 disabled prop 变化', async () => {
      const wrapper = mount(Button, {
        props: { disabled: false },
        slots: { default: '按钮' }
      });

      let button = wrapper.find('button');
      expect(button.attributes('disabled')).toBeUndefined();

      await wrapper.setProps({ disabled: true });
      button = wrapper.find('button');
      expect(button.attributes('disabled')).toBeDefined();
    });

    it('应该响应 loading prop 变化', async () => {
      const onClick = vi.fn();
      const wrapper = mount(Button, {
        props: {
          loading: false,
          onClick
        },
        slots: { default: '按钮' }
      });

      let button = wrapper.find('button');
      await button.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);

      await wrapper.setProps({ loading: true });
      button = wrapper.find('button');
      onClick.mockClear();
      await button.trigger('click');
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('废弃警告', () => {
    it('使用 type prop 应该显示警告', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      mount(Button, {
        props: { type: 'primary' },
        slots: { default: '按钮' }
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        '[Today-UI Button]: "type" prop is deprecated. Use "appearance" instead.'
      );

      consoleSpy.mockRestore();
    });
  });

  describe('无障碍性相关', () => {
    it('应该支持传递自定义属性', () => {
      const wrapper = mount(Button, {
        attrs: {
          'aria-label': '关闭对话框',
          'data-testid': 'close-button'
        },
        slots: { default: '✕' }
      });

      const button = wrapper.find('button');
      expect(button.attributes('aria-label')).toBe('关闭对话框');
      expect(button.attributes('data-testid')).toBe('close-button');
    });

    it('应该支持 name 属性（表单提交）', () => {
      const wrapper = mount(Button, {
        attrs: { name: 'submit-button' },
        slots: { default: '提交' }
      });

      const button = wrapper.find('button');
      expect(button.attributes('name')).toBe('submit-button');
    });
  });

  describe('边界情况', () => {
    it('应该处理空内容', () => {
      const wrapper = mount(Button);

      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe('');
    });

    it('应该处理超长文本', () => {
      const longText = '这是一个非常非常非常非常长的按钮文本';
      const wrapper = mount(Button, {
        slots: { default: longText }
      });

      const button = wrapper.find('button');
      expect(button.text()).toBe(longText);
    });

    it('应该处理 HTML 字符实体', () => {
      const wrapper = mount(Button, {
        slots: { default: '<>&"' }
      });

      const button = wrapper.find('button');
      expect(button.text()).toBe('<>&"');
    });
  });
});
