import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { defineComponent, h, computed } from 'vue';
import Input from '../Input';
import type { InputProps } from '../Input.types';

describe('Input 组件', () => {
  describe('Props 渲染', () => {
    it('默认渲染为包含 input 元素的 div', () => {
      const wrapper = mount(Input);

      const root = wrapper.find('.t-input');
      const input = wrapper.find('input');
      expect(root.exists()).toBe(true);
      expect(input.exists()).toBe(true);
    });

    it('默认外观为 outline', () => {
      const wrapper = mount(Input, {
        props: { appearance: 'outline' as InputProps['appearance'] }
      });

      const root = wrapper.find('.t-input');
      // outline 是默认值，不添加修饰符类名
      expect(root.exists()).toBe(true);
    });

    describe('appearance 属性', () => {
      const appearances: Array<InputProps['appearance']> = [
        'outline',
        'filled',
        'underlined',
        'inline-dark',
        'inline-light'
      ];

      appearances.forEach((appearance) => {
        it(`应该渲染 appearance="${appearance}"`, () => {
          const wrapper = mount(Input, {
            props: { appearance }
          });

          const root = wrapper.find('.t-input');
          expect(root.exists()).toBe(true);
        });
      });
    });

    describe('size 属性', () => {
      const sizes: Array<InputProps['size']> = ['small', 'medium', 'large'];

      sizes.forEach((size) => {
        it(`应该渲染 size="${size}"`, () => {
          const wrapper = mount(Input, {
            props: { size }
          });

          const root = wrapper.find('.t-input');
          expect(root.exists()).toBe(true);
        });
      });
    });

    describe('type 属性', () => {
      const types: Array<InputProps['type']> = [
        'text',
        'password',
        'email',
        'number',
        'tel',
        'url',
        'search'
      ];

      types.forEach((type) => {
        it(`应该渲染 type="${type}"`, () => {
          const wrapper = mount(Input, {
            props: { type }
          });

          const input = wrapper.find('input');
          expect(input.attributes('type')).toBe(type);
        });
      });
    });

    describe('disabled 属性', () => {
      it('应该在禁用状态下禁用输入框', () => {
        const wrapper = mount(Input, {
          props: { disabled: true }
        });

        const input = wrapper.find('input');
        expect(input.attributes('disabled')).toBeDefined();
      });

      it('禁用状态下不应该触发输入事件', async () => {
        const onInput = vi.fn();
        const wrapper = mount(Input, {
          props: {
            disabled: true,
            onInput
          }
        });

        const input = wrapper.find('input');
        await input.setValue('test');
        expect(onInput).not.toHaveBeenCalled();
      });
    });

    describe('readonly 属性', () => {
      it('应该在只读状态下设置 readonly', () => {
        const wrapper = mount(Input, {
          props: { readonly: true }
        });

        const input = wrapper.find('input');
        expect(input.attributes('readonly')).toBeDefined();
      });

      it('只读状态下应该允许选择和复制', async () => {
        const onInput = vi.fn();
        const wrapper = mount(Input, {
          props: {
            readonly: true,
            onInput
          }
        });

        const input = wrapper.find('input');
        // readonly 允许选择，只是不允许修改值
        expect(input.attributes('readonly')).toBeDefined();
      });
    });

    describe('required 属性', () => {
      it('应该设置 required 属性', () => {
        const wrapper = mount(Input, {
          props: { required: true }
        });

        const input = wrapper.find('input');
        expect(input.attributes('required')).toBeDefined();
      });
    });

    describe('error 属性', () => {
      it('应该设置 error 状态', () => {
        const wrapper = mount(Input, {
          props: { error: true }
        });

        const root = wrapper.find('.t-input');
        expect(root.classes()).toContain('error');
      });
    });

    describe('validationState 属性', () => {
      const validationStates: Array<InputProps['validationState']> = [
        'none',
        'valid',
        'warning',
        'invalid'
      ];

      validationStates.forEach((validationState) => {
        it(`应该渲染 validationState="${validationState}"`, () => {
          const wrapper = mount(Input, {
            props: { validationState }
          });

          const root = wrapper.find('.t-input');
          expect(root.exists()).toBe(true);
        });
      });
    });

    describe('其他 HTML 属性', () => {
      it('应该设置 placeholder', () => {
        const wrapper = mount(Input, {
          props: { placeholder: '请输入内容' }
        });

        const input = wrapper.find('input');
        expect(input.attributes('placeholder')).toBe('请输入内容');
      });

      it('应该设置 name', () => {
        const wrapper = mount(Input, {
          props: { name: 'username' }
        });

        const input = wrapper.find('input');
        expect(input.attributes('name')).toBe('username');
      });

      it('应该设置 maxLength', () => {
        const wrapper = mount(Input, {
          props: { maxLength: 100 }
        });

        const input = wrapper.find('input');
        expect(input.attributes('maxlength')).toBe('100');
      });

      it('应该设置 minLength', () => {
        const wrapper = mount(Input, {
          props: { minLength: 5 }
        });

        const input = wrapper.find('input');
        expect(input.attributes('minlength')).toBe('5');
      });

      it('应该设置 autocomplete', () => {
        const wrapper = mount(Input, {
          props: { autocomplete: 'off' }
        });

        const input = wrapper.find('input');
        expect(input.attributes('autocomplete')).toBe('off');
      });
    });
  });

  describe('v-model 支持', () => {
    it('应该支持 v-model 双向绑定', async () => {
      const wrapper = mount(Input, {
        props: {
          modelValue: ''
        }
      });

      const input = wrapper.find('input');
      await input.setValue('test value');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test value']);
    });

    it('应该正确显示初始值', () => {
      const wrapper = mount(Input, {
        props: {
          modelValue: 'initial value'
        }
      });

      const input = wrapper.find('input');
      expect(input.element.value).toBe('initial value');
    });

    it('应该在受控模式下响应 modelValue 变化', async () => {
      const wrapper = mount(Input, {
        props: {
          modelValue: 'initial'
        }
      });

      await wrapper.setProps({ modelValue: 'updated' });

      const input = wrapper.find('input');
      expect(input.element.value).toBe('updated');
    });
  });

  describe('非受控模式', () => {
    it('应该使用 defaultValue 作为初始值', () => {
      const wrapper = mount(Input, {
        props: {
          defaultValue: 'default value'
        }
      });

      const input = wrapper.find('input');
      expect(input.element.value).toBe('default value');
    });

    it('应该在非受控模式下更新内部值', async () => {
      const wrapper = mount(Input, {
        props: {
          defaultValue: 'initial'
        }
      });

      const input = wrapper.find('input');
      await input.setValue('updated');

      expect(input.element.value).toBe('updated');
    });
  });

  describe('事件处理', () => {
    it('应该触发 onInput 事件', async () => {
      const onInput = vi.fn();
      const wrapper = mount(Input, {
        props: { onInput }
      });

      const input = wrapper.find('input');
      await input.setValue('test');

      expect(onInput).toHaveBeenCalledTimes(1);
      expect(onInput).toHaveBeenCalledWith('test', expect.any(Event));
    });

    it('应该触发 onChange 事件', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Input, {
        props: { onChange }
      });

      const input = wrapper.find('input');
      await input.trigger('change');

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('应该触发 onFocus 事件', async () => {
      const onFocus = vi.fn();
      const wrapper = mount(Input, {
        props: { onFocus }
      });

      const input = wrapper.find('input');
      await input.trigger('focus');

      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('应该触发 onBlur 事件', async () => {
      const onBlur = vi.fn();
      const wrapper = mount(Input, {
        props: { onBlur }
      });

      const input = wrapper.find('input');
      await input.trigger('blur');

      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('插槽', () => {
    it('应该渲染 contentBefore 插槽', () => {
      const wrapper = mount(Input, {
        slots: {
          contentBefore: '<span class="before-icon">🔍</span>'
        }
      });

      const beforeContent = wrapper.find('.before-icon');
      expect(beforeContent.exists()).toBe(true);
      expect(beforeContent.text()).toBe('🔍');
    });

    it('应该渲染 contentAfter 插槽', () => {
      const wrapper = mount(Input, {
        slots: {
          contentAfter: '<span class="after-icon">@example.com</span>'
        }
      });

      const afterContent = wrapper.find('.after-icon');
      expect(afterContent.exists()).toBe(true);
      expect(afterContent.text()).toBe('@example.com');
    });

    it('应该同时渲染 contentBefore 和 contentAfter 插槽', () => {
      const wrapper = mount(Input, {
        slots: {
          contentBefore: '<span class="before">📧</span>',
          contentAfter: '<span class="after">@gmail.com</span>'
        }
      });

      const beforeContent = wrapper.find('.before');
      const afterContent = wrapper.find('.after');
      expect(beforeContent.exists()).toBe(true);
      expect(afterContent.exists()).toBe(true);
    });
  });

  describe('清除按钮', () => {
    it('当有值且 showClearButton=true 时显示清除按钮', () => {
      const wrapper = mount(Input, {
        props: {
          modelValue: 'test value',
          showClearButton: true
        }
      });

      const clearButton = wrapper.find('button[aria-label="清除输入内容"]');
      expect(clearButton.exists()).toBe(true);
    });

    it('当没有值时不显示清除按钮', () => {
      const wrapper = mount(Input, {
        props: {
          modelValue: '',
          showClearButton: true
        }
      });

      const clearButton = wrapper.find('button[aria-label="清除输入内容"]');
      expect(clearButton.exists()).toBe(false);
    });

    it('当 showClearButton=false 时不显示清除按钮', () => {
      const wrapper = mount(Input, {
        props: {
          modelValue: 'test value',
          showClearButton: false
        }
      });

      const clearButton = wrapper.find('button[aria-label="清除输入内容"]');
      expect(clearButton.exists()).toBe(false);
    });

    it('当 disabled=true 时不显示清除按钮', () => {
      const wrapper = mount(Input, {
        props: {
          modelValue: 'test value',
          showClearButton: true,
          disabled: true
        }
      });

      const clearButton = wrapper.find('button[aria-label="清除输入内容"]');
      expect(clearButton.exists()).toBe(false);
    });

    it('当 readonly=true 时不显示清除按钮', () => {
      const wrapper = mount(Input, {
        props: {
          modelValue: 'test value',
          showClearButton: true,
          readonly: true
        }
      });

      const clearButton = wrapper.find('button[aria-label="清除输入内容"]');
      expect(clearButton.exists()).toBe(false);
    });

    it('点击清除按钮应该清空输入', async () => {
      const onInput = vi.fn();
      const onChange = vi.fn();
      const wrapper = mount(Input, {
        props: {
          modelValue: 'test value',
          showClearButton: true,
          onInput,
          onChange
        }
      });

      const clearButton = wrapper.find('button[aria-label="清除输入内容"]');
      await clearButton.trigger('click');

      expect(onInput).toHaveBeenCalledWith('', expect.any(Event));
      expect(onChange).toHaveBeenCalledWith('', expect.any(Event));
    });
  });

  describe('密码显示/隐藏', () => {
    it('当 type="password" 且 showPasswordToggle=true 时显示切换按钮', () => {
      const wrapper = mount(Input, {
        props: {
          type: 'password',
          showPasswordToggle: true
        }
      });

      const toggleButton = wrapper.find('button[aria-label="显示密码"]');
      expect(toggleButton.exists()).toBe(true);
    });

    it('当 type="text" 时不显示密码切换按钮', () => {
      const wrapper = mount(Input, {
        props: {
          type: 'text',
          showPasswordToggle: true
        }
      });

      const toggleButton = wrapper.find('button[aria-label*="密码"]');
      expect(toggleButton.exists()).toBe(false);
    });

    it('当 showPasswordToggle=false 时不显示密码切换按钮', () => {
      const wrapper = mount(Input, {
        props: {
          type: 'password',
          showPasswordToggle: false
        }
      });

      const toggleButton = wrapper.find('button[aria-label*="密码"]');
      expect(toggleButton.exists()).toBe(false);
    });

    it('点击密码切换按钮应该切换密码可见性', async () => {
      const wrapper = mount(Input, {
        props: {
          type: 'password',
          showPasswordToggle: true
        }
      });

      const input = wrapper.find('input');
      expect(input.attributes('type')).toBe('password');

      const toggleButton = wrapper.find('button[aria-label="显示密码"]');
      await toggleButton.trigger('click');

      expect(input.attributes('type')).toBe('text');
    });
  });

  describe('进度指示器', () => {
    it('当设置了 progress 属性时显示进度条', () => {
      const wrapper = mount(Input, {
        props: {
          progress: 50
        }
      });

      const progressBar = wrapper.find('[role="progressbar"]');
      expect(progressBar.exists()).toBe(true);
      expect(progressBar.attributes('aria-valuenow')).toBe('50');
    });

    it('当 progress=0 时显示进度条', () => {
      const wrapper = mount(Input, {
        props: {
          progress: 0
        }
      });

      const progressBar = wrapper.find('[role="progressbar"]');
      expect(progressBar.exists()).toBe(true);
      expect(progressBar.attributes('aria-valuenow')).toBe('0');
    });

    it('当 progress=100 时显示完整进度条', () => {
      const wrapper = mount(Input, {
        props: {
          progress: 100
        }
      });

      const progressBar = wrapper.find('[role="progressbar"]');
      expect(progressBar.exists()).toBe(true);
      expect(progressBar.attributes('aria-valuenow')).toBe('100');
    });
  });

  describe('自定义插槽', () => {
    it('应该使用自定义清除按钮插槽', () => {
      const wrapper = mount(Input, {
        props: {
          modelValue: 'test',
          showClearButton: true
        },
        slots: {
          clearButton: '<button class="custom-clear">Custom</button>'
        }
      });

      const customClear = wrapper.find('.custom-clear');
      expect(customClear.exists()).toBe(true);
    });

    it('应该使用自定义密码切换按钮插槽', () => {
      const wrapper = mount(Input, {
        props: {
          type: 'password',
          showPasswordToggle: true
        },
        slots: {
          passwordToggleButton: '<button class="custom-toggle">Toggle</button>'
        }
      });

      const customToggle = wrapper.find('.custom-toggle');
      expect(customToggle.exists()).toBe(true);
    });

    it('应该使用自定义进度指示器插槽', () => {
      const wrapper = mount(Input, {
        props: {
          progress: 50
        },
        slots: {
          progressIndicator: '<div class="custom-progress">Loading...</div>'
        }
      });

      const customProgress = wrapper.find('.custom-progress');
      expect(customProgress.exists()).toBe(true);
    });
  });

  describe('动态 props 更新', () => {
    it('应该响应 appearance prop 变化', async () => {
      const wrapper = mount(Input, {
        props: { appearance: 'outline' }
      });

      await wrapper.setProps({ appearance: 'filled' });
      expect(wrapper.props('appearance')).toBe('filled');
    });

    it('应该响应 disabled prop 变化', async () => {
      const wrapper = mount(Input, {
        props: { disabled: false }
      });

      let input = wrapper.find('input');
      expect(input.attributes('disabled')).toBeUndefined();

      await wrapper.setProps({ disabled: true });
      input = wrapper.find('input');
      expect(input.attributes('disabled')).toBeDefined();
    });

    it('应该响应 error prop 变化', async () => {
      const wrapper = mount(Input, {
        props: { error: false }
      });

      let root = wrapper.find('.t-input');
      expect(root.classes()).not.toContain('error');

      await wrapper.setProps({ error: true });
      root = wrapper.find('.t-input');
      expect(root.classes()).toContain('error');
    });
  });

  describe('无障碍性相关', () => {
    it('应该支持传递自定义属性', () => {
      const wrapper = mount(Input, {
        attrs: {
          'data-testid': 'test-input',
          'aria-label': '测试输入框'
        }
      });

      const input = wrapper.find('input');
      // 注意：由于我们的实现是将自定义属性传递到 root 元素，这里测试 root
      const root = wrapper.find('.t-input');
      expect(root.attributes('data-testid')).toBe('test-input');
    });
  });

  describe('边界情况', () => {
    it('应该处理空值', () => {
      const wrapper = mount(Input, {
        props: { modelValue: '' }
      });

      const input = wrapper.find('input');
      expect(input.element.value).toBe('');
    });

    it('应该处理超长文本', () => {
      const longText = 'a'.repeat(1000);
      const wrapper = mount(Input, {
        props: { modelValue: longText }
      });

      const input = wrapper.find('input');
      expect(input.element.value).toBe(longText);
    });

    it('应该处理特殊字符', () => {
      const specialChars = '<>&"\'`';
      const wrapper = mount(Input, {
        props: { modelValue: specialChars }
      });

      const input = wrapper.find('input');
      expect(input.element.value).toBe(specialChars);
    });

    it('应该处理 maxLength 限制', async () => {
      const maxLength = 10;
      const wrapper = mount(Input, {
        props: { maxLength }
      });

      const input = wrapper.find('input');
      // 验证 maxlength 属性被正确设置
      expect(input.attributes('maxlength')).toBe(String(maxLength));
    });
  });

  describe('与 Label 组件的配合', () => {
    it('应该支持通过 id 属性与 Label 关联', () => {
      const TestComponent = defineComponent({
        components: { Input },
        template: `
          <div>
            <label for="test-input">测试标签</label>
            <Input id="test-input" />
          </div>
        `
      });

      const wrapper = mount(TestComponent);
      const label = wrapper.find('label');
      const input = wrapper.find('input');

      expect(label.attributes('for')).toBe('test-input');
      expect(input.attributes('id')).toBe('test-input');
    });
  });
});
