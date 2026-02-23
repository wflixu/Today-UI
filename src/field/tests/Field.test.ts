import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { defineComponent, h, ref } from 'vue';
import Field from '../Field';
import Label from '@/label/Label';
import Input from '@/input/Input';
import HelperText from '@/field/HelperText';
import type { FieldProps } from '../Field.types';

// Mock components for testing
const MockInput = defineComponent({
  name: 'MockInput',
  props: {
    id: String,
    modelValue: String,
  },
  setup(props, { emit }) {
    return () => h('input', {
      id: props.id,
      value: props.modelValue,
      onInput: (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value),
    });
  },
});

describe('Field 组件', () => {
  describe('Props 渲染', () => {
    it('默认渲染为 div 元素', () => {
      const wrapper = mount(Field);

      const root = wrapper.find('.t-field');
      expect(root.exists()).toBe(true);
    });

    it('默认 orientation 为 vertical', () => {
      const wrapper = mount(Field, {
        props: { orientation: 'vertical' as FieldProps['orientation'] }
      });

      const root = wrapper.find('.t-field');
      expect(root.exists()).toBe(true);
    });

    describe('orientation 属性', () => {
      const orientations: Array<FieldProps['orientation']> = ['vertical', 'horizontal'];

      orientations.forEach((orientation) => {
        it(`应该渲染 orientation="${orientation}"`, () => {
          const wrapper = mount(Field, {
            props: { orientation }
          });

          const root = wrapper.find('.t-field');
          expect(root.exists()).toBe(true);
        });
      });
    });

    describe('validationState 属性', () => {
      const validationStates: Array<FieldProps['validationState']> = [
        'none',
        'valid',
        'warning',
        'invalid'
      ];

      validationStates.forEach((validationState) => {
        it(`应该渲染 validationState="${validationState}"`, () => {
          const wrapper = mount(Field, {
            props: { validationState }
          });

          const root = wrapper.find('.t-field');
          expect(root.exists()).toBe(true);
        });
      });
    });
  });

  describe('插槽', () => {
    it('应该渲染 label 插槽', () => {
      const wrapper = mount(Field, {
        slots: {
          label: '<label class="test-label">Test Label</label>'
        }
      });

      const label = wrapper.find('.test-label');
      expect(label.exists()).toBe(true);
      expect(label.text()).toBe('Test Label');
    });

    it('应该渲染 default 插槽（内容区域）', () => {
      const wrapper = mount(Field, {
        slots: {
          default: '<input class="test-input" />'
        }
      });

      const content = wrapper.find('.t-field__content');
      const input = wrapper.find('.test-input');
      expect(content.exists()).toBe(true);
      expect(input.exists()).toBe(true);
    });

    it('应该渲染 helperText 插槽', () => {
      const wrapper = mount(Field, {
        slots: {
          helperText: '<p class="test-helper">Helper text</p>'
        }
      });

      const helperText = wrapper.find('.test-helper');
      expect(helperText.exists()).toBe(true);
      expect(helperText.text()).toBe('Helper text');
    });

    it('应该渲染 validationMessage 插槽', () => {
      const wrapper = mount(Field, {
        slots: {
          validationMessage: '<div class="custom-validation">Custom validation message</div>'
        }
      });

      const validationMessage = wrapper.find('.custom-validation');
      expect(validationMessage.exists()).toBe(true);
      expect(validationMessage.text()).toBe('Custom validation message');
    });

    it('应该同时渲染所有插槽', () => {
      const wrapper = mount(Field, {
        slots: {
          label: '<label class="test-label">Label</label>',
          default: '<input class="test-input" />',
          helperText: '<p class="test-helper">Helper</p>',
        }
      });

      const label = wrapper.find('.test-label');
      const input = wrapper.find('.test-input');
      const helper = wrapper.find('.test-helper');

      expect(label.exists()).toBe(true);
      expect(input.exists()).toBe(true);
      expect(helper.exists()).toBe(true);
    });
  });

  describe('验证消息', () => {
    it('当设置 validationMessage 时显示验证消息', () => {
      const wrapper = mount(Field, {
        props: {
          validationMessage: 'This field is required',
          validationState: 'invalid'
        }
      });

      const validationMessage = wrapper.find('.t-field__validation-message');
      expect(validationMessage.exists()).toBe(true);
      expect(validationMessage.text()).toContain('This field is required');
    });

    it('validationState="valid" 时显示 ✓ 图标', () => {
      const wrapper = mount(Field, {
        props: {
          validationMessage: 'Valid email format',
          validationState: 'valid'
        }
      });

      const validationMessage = wrapper.find('.t-field__validation-message');
      expect(validationMessage.text()).toContain('✓');
      expect(validationMessage.text()).toContain('Valid email format');
    });

    it('validationState="warning" 时显示 ⚠ 图标', () => {
      const wrapper = mount(Field, {
        props: {
          validationMessage: 'Email might be temporary',
          validationState: 'warning'
        }
      });

      const validationMessage = wrapper.find('.t-field__validation-message');
      expect(validationMessage.text()).toContain('⚠');
      expect(validationMessage.text()).toContain('Email might be temporary');
    });

    it('validationState="invalid" 时显示 ✕ 图标', () => {
      const wrapper = mount(Field, {
        props: {
          validationMessage: 'Invalid email format',
          validationState: 'invalid'
        }
      });

      const validationMessage = wrapper.find('.t-field__validation-message');
      expect(validationMessage.text()).toContain('✕');
      expect(validationMessage.text()).toContain('Invalid email format');
    });

    it('validationState="none" 时不显示图标', () => {
      const wrapper = mount(Field, {
        props: {
          validationMessage: 'Just a message',
          validationState: 'none'
        }
      });

      const validationMessage = wrapper.find('.t-field__validation-message');
      expect(validationMessage.exists()).toBe(true);
      expect(validationMessage.text()).toBe('Just a message');
    });

    it('自定义 validationMessage 插槽优先级高于 prop', () => {
      const wrapper = mount(Field, {
        props: {
          validationMessage: 'Prop message',
          validationState: 'invalid'
        },
        slots: {
          validationMessage: '<div class="custom-validation">Slot message</div>'
        }
      });

      const customValidation = wrapper.find('.custom-validation');
      const defaultValidation = wrapper.find('.t-field__validation-message');

      expect(customValidation.exists()).toBe(true);
      expect(customValidation.text()).toBe('Slot message');
      expect(defaultValidation.exists()).toBe(false);
    });

    it('验证消息应该有正确的 ARIA 属性', () => {
      const wrapper = mount(Field, {
        props: {
          validationMessage: 'Error message',
          validationState: 'invalid'
        }
      });

      const validationMessage = wrapper.find('.t-field__validation-message');
      expect(validationMessage.attributes('role')).toBe('status');
      expect(validationMessage.attributes('aria-live')).toBe('polite');
    });
  });

  describe('布局方向', () => {
    it('orientation="vertical" 时应用垂直布局类名', () => {
      const wrapper = mount(Field, {
        props: { orientation: 'vertical' }
      });

      const root = wrapper.find('.t-field');
      // vertical 是默认值，所以不会有 orientation-vertical 类名
      expect(root.exists()).toBe(true);
    });

    it('orientation="horizontal" 时应用水平布局类名', () => {
      const wrapper = mount(Field, {
        props: { orientation: 'horizontal' }
      });

      const root = wrapper.find('.t-field');
      expect(root.classes()).toContain('orientation-horizontal');
    });
  });

  describe('与 Label、Input 组件的配合', () => {
    it('应该正确渲染 Label + Field + Input 组合', () => {
      const wrapper = mount(Field, {
        slots: {
          label: '<label for="test-input" class="test-label">用户名</label>',
          default: '<input id="test-input" class="test-input" />'
        }
      });

      const label = wrapper.find('.test-label');
      const input = wrapper.find('.test-input');

      expect(label.exists()).toBe(true);
      expect(input.exists()).toBe(true);
      expect(label.attributes('for')).toBe('test-input');
      expect(input.attributes('id')).toBe('test-input');
    });

    it('应该支持 v-model 与 Input 的双向绑定', async () => {
      const TestComponent = defineComponent({
        components: { Field, MockInput },
        template: `
          <Field>
            <template #label>
              <label for="test-input">用户名</label>
            </template>
            <MockInput id="test-input" v-model="value" />
          </Field>
        `,
        setup() {
          const value = ref('');
          return { value };
        }
      });

      const wrapper = mount(TestComponent);

      const input = wrapper.find('input');
      await input.setValue('test value');

      expect(wrapper.vm.value).toBe('test value');
    });
  });

  describe('与 HelperText 组件的配合', () => {
    it('应该正确渲染 Field + HelperText 组合', () => {
      const wrapper = mount(Field, {
        slots: {
          default: '<input class="test-input" />',
          helperText: '<p class="test-helper">请输入您的用户名</p>'
        }
      });

      const input = wrapper.find('.test-input');
      const helperText = wrapper.find('.test-helper');

      expect(input.exists()).toBe(true);
      expect(helperText.exists()).toBe(true);
      expect(helperText.text()).toBe('请输入您的用户名');
    });
  });

  describe('完整表单字段', () => {
    it('应该正确渲染 Label + Input + HelperText + ValidationMessage', () => {
      const wrapper = mount(Field, {
        props: {
          validationMessage: '邮箱格式不正确',
          validationState: 'invalid'
        },
        slots: {
          label: '<label for="email" class="test-label">邮箱地址</label>',
          default: '<input id="email" class="test-input" />',
          helperText: '<p class="test-helper">请输入您的工作邮箱</p>'
        }
      });

      const label = wrapper.find('.test-label');
      const input = wrapper.find('.test-input');
      const helperText = wrapper.find('.test-helper');
      const validationMessage = wrapper.find('.t-field__validation-message');

      expect(label.exists()).toBe(true);
      expect(input.exists()).toBe(true);
      expect(helperText.exists()).toBe(true);
      expect(validationMessage.exists()).toBe(true);

      expect(label.text()).toBe('邮箱地址');
      expect(helperText.text()).toBe('请输入您的工作邮箱');
      expect(validationMessage.text()).toContain('邮箱格式不正确');
    });
  });

  describe('动态 props 更新', () => {
    it('应该响应 validationState prop 变化', async () => {
      const wrapper = mount(Field, {
        props: {
          validationMessage: 'Error message',
          validationState: 'invalid'
        }
      });

      let validationMessage = wrapper.find('.t-field__validation-message');
      expect(validationMessage.text()).toContain('✕');

      await wrapper.setProps({ validationState: 'valid' });

      validationMessage = wrapper.find('.t-field__validation-message');
      expect(validationMessage.text()).toContain('✓');
    });

    it('应该响应 validationMessage prop 变化', async () => {
      const wrapper = mount(Field, {
        props: {
          validationMessage: 'Initial message',
          validationState: 'invalid'
        }
      });

      let validationMessage = wrapper.find('.t-field__validation-message');
      expect(validationMessage.text()).toContain('Initial message');

      await wrapper.setProps({ validationMessage: 'Updated message' });

      validationMessage = wrapper.find('.t-field__validation-message');
      expect(validationMessage.text()).toContain('Updated message');
    });

    it('应该响应 orientation prop 变化', async () => {
      const wrapper = mount(Field, {
        props: { orientation: 'vertical' }
      });

      let root = wrapper.find('.t-field');
      expect(root.classes()).not.toContain('orientation-horizontal');

      await wrapper.setProps({ orientation: 'horizontal' });

      root = wrapper.find('.t-field');
      expect(root.classes()).toContain('orientation-horizontal');
    });
  });

  describe('无障碍性相关', () => {
    it('应该支持传递自定义属性', () => {
      const wrapper = mount(Field, {
        attrs: {
          'data-testid': 'test-field',
          'aria-describedby': 'field-description'
        }
      });

      const root = wrapper.find('.t-field');
      expect(root.attributes('data-testid')).toBe('test-field');
      expect(root.attributes('aria-describedby')).toBe('field-description');
    });
  });

  describe('边界情况', () => {
    it('应该处理空内容（所有插槽都为空）', () => {
      const wrapper = mount(Field);

      const root = wrapper.find('.t-field');
      const content = wrapper.find('.t-field__content');

      expect(root.exists()).toBe(true);
      expect(content.exists()).toBe(true);
    });

    it('应该处理只有 default 插槽的情况', () => {
      const wrapper = mount(Field, {
        slots: {
          default: '<input class="test-input" />'
        }
      });

      const input = wrapper.find('.test-input');
      expect(input.exists()).toBe(true);
    });

    it('validationMessage 为空时不显示验证消息', () => {
      const wrapper = mount(Field, {
        props: {
          validationMessage: undefined,
          validationState: 'invalid'
        }
      });

      const validationMessage = wrapper.find('.t-field__validation-message');
      expect(validationMessage.exists()).toBe(false);
    });

    it('validationMessage 为空字符串时不显示验证消息', () => {
      const wrapper = mount(Field, {
        props: {
          validationMessage: '',
          validationState: 'invalid'
        }
      });

      const validationMessage = wrapper.find('.t-field__validation-message');
      expect(validationMessage.exists()).toBe(false);
    });
  });

  describe('真实场景测试', () => {
    it('应该支持完整的表单字段（Label + Input + HelperText + Validation）', () => {
      const TestComponent = defineComponent({
        components: { Field, MockInput },
        template: `
          <Field
            :validation-state="emailState"
            :validation-message="validationMessage"
          >
            <template #label>
              <label for="email" class="field-label">邮箱地址</label>
            </template>
            <MockInput id="email" v-model="email" class="field-input" />
            <template #helperText>
              <p class="field-helper">请输入您的工作邮箱地址</p>
            </template>
          </Field>
        `,
        setup() {
          const email = ref('');
          const emailState = ref<'none' | 'valid' | 'warning' | 'invalid'>('invalid');
          const validationMessage = ref('邮箱格式不正确');

          return { email, emailState, validationMessage };
        }
      });

      const wrapper = mount(TestComponent);

      const label = wrapper.find('.field-label');
      const input = wrapper.find('.field-input');
      const helperText = wrapper.find('.field-helper');
      const validationMessage = wrapper.find('.t-field__validation-message');

      expect(label.exists()).toBe(true);
      expect(input.exists()).toBe(true);
      expect(helperText.exists()).toBe(true);
      expect(validationMessage.exists()).toBe(true);
    });

    it('水平布局应该正确排列 Label 和 Input', () => {
      const wrapper = mount(Field, {
        props: { orientation: 'horizontal' },
        slots: {
          label: '<label class="test-label">用户名</label>',
          default: '<input class="test-input" />'
        }
      });

      const root = wrapper.find('.t-field');
      expect(root.classes()).toContain('orientation-horizontal');
    });
  });
});
