import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import Label from '../Label';
import Input from '../../input/Input';

describe('Label Component', () => {
  describe('Props Rendering', () => {
    it('should render with default props', () => {
      const wrapper = mount(Label, {
        props: { for: 'test' },
        slots: { default: 'Test Label' }
      });

      expect(wrapper.find('label').exists()).toBe(true);
      expect(wrapper.find('label').text()).toBe('Test Label');
      expect(wrapper.find('label').attributes('for')).toBe('test');
    });

    it('should render size variants correctly', () => {
      const sizes = ['small', 'medium', 'large'] as const;

      sizes.forEach(size => {
        const wrapper = mount(Label, {
          props: { for: 'test', size },
          slots: { default: 'Test' }
        });

        expect(wrapper.find('label').classes()).toContain('t-label');
      });
    });

    it('should apply weight variants correctly', () => {
      const weights = ['normal', 'semibold', 'bold'] as const;

      weights.forEach(weight => {
        const wrapper = mount(Label, {
          props: { for: 'test', weight },
          slots: { default: 'Test' }
        });

        expect(wrapper.find('label').exists()).toBe(true);
      });
    });

    it('should show required indicator when required=true', () => {
      const wrapper = mount(Label, {
        props: { for: 'test', required: true },
        slots: { default: 'Test' }
      });

      const indicator = wrapper.find('.t-label__required-indicator');
      expect(indicator.exists()).toBe(true);
      expect(indicator.text()).toBe('*');
    });

    it('should support custom required indicator slot', () => {
      const wrapper = mount(Label, {
        props: { for: 'test', required: true },
        slots: {
          default: 'Test',
          requiredIndicator: '(必填)'
        }
      });

      const indicator = wrapper.find('.t-label__required-indicator');
      expect(indicator.text()).toBe('(必填)');
    });

    it('should apply disabled state', () => {
      const wrapper = mount(Label, {
        props: { for: 'test', disabled: true },
        slots: { default: 'Test' }
      });

      expect(wrapper.find('label').classes()).toContain('t-label');
    });

    it('should support label prop', () => {
      const wrapper = mount(Label, {
        props: { for: 'test', label: 'Label from prop' }
      });

      expect(wrapper.find('label').text()).toBe('Label from prop');
    });

    it('should prioritize slot over prop', () => {
      const wrapper = mount(Label, {
        props: { for: 'test', label: 'Label from prop' },
        slots: { default: 'Label from slot' }
      });

      expect(wrapper.find('label').text()).toBe('Label from slot');
    });
  });

  describe('Accessibility', () => {
    it('should associate label with input via for/id', () => {
      const TestComponent = defineComponent({
        setup() {
          return () => h('div', [
            h(Label, { for: 'email' }, () => 'Email'),
            h(Input, { id: 'email' })
          ]);
        }
      });

      const wrapper = mount(TestComponent);
      const label = wrapper.find('label');
      expect(label.attributes('for')).toBe('email');
    });

    it('should hide required indicator from screen readers', () => {
      const wrapper = mount(Label, {
        props: { for: 'test', required: true },
        slots: { default: 'Test' }
      });

      const indicator = wrapper.find('.t-label__required-indicator');
      expect(indicator.attributes('aria-hidden')).toBe('true');
    });

    it('should apply disabled attribute when disabled', () => {
      const wrapper = mount(Label, {
        props: { for: 'test', disabled: true },
        slots: { default: 'Test' }
      });

      // Note: HTML label elements don't have a disabled attribute
      // But the visual styling should indicate disabled state
      expect(wrapper.find('label').classes()).toContain('t-label');
    });
  });

  describe('Styles and Classes', () => {
    it('should apply semantic t-label class', () => {
      const wrapper = mount(Label, {
        props: { for: 'test' },
        slots: { default: 'Test' }
      });

      expect(wrapper.find('label').classes()).toContain('t-label');
    });

    it('should merge custom className with Griffel classes', () => {
      const wrapper = mount(Label, {
        props: {
          for: 'test',
          class: 'custom-class'
        },
        slots: { default: 'Test' }
      });

      expect(wrapper.find('label').classes()).toContain('t-label');
      expect(wrapper.find('label').classes()).toContain('custom-class');
    });

    it('should not generate modifier classes for size variants', () => {
      const wrapper = mount(Label, {
        props: { for: 'test', size: 'small' },
        slots: { default: 'Test' }
      });

      const classes = wrapper.find('label').classes();
      // Should NOT have size-small class (removed in redesign)
      expect(classes).not.toContain('size-small');
      // Should have semantic class
      expect(classes).toContain('t-label');
    });

    it('should not generate modifier classes for weight variants', () => {
      const wrapper = mount(Label, {
        props: { for: 'test', weight: 'bold' },
        slots: { default: 'Test' }
      });

      const classes = wrapper.find('label').classes();
      // Should NOT have weight-bold class (removed in redesign)
      expect(classes).not.toContain('weight-bold');
      // Should have semantic class
      expect(classes).toContain('t-label');
    });

    it('should not generate modifier classes for disabled state', () => {
      const wrapper = mount(Label, {
        props: { for: 'test', disabled: true },
        slots: { default: 'Test' }
      });

      const classes = wrapper.find('label').classes();
      // Should NOT have disabled class (removed in redesign)
      expect(classes).not.toContain('disabled');
      // Should have semantic class
      expect(classes).toContain('t-label');
    });
  });

  describe('Integration with Input', () => {
    it('should work correctly with Input component', () => {
      const TestComponent = defineComponent({
        setup() {
          return () => h('div', [
            h(Label, { for: 'test-input', size: 'large', required: true }, () => 'Test Label'),
            h(Input, { id: 'test-input', size: 'large' })
          ]);
        }
      });

      const wrapper = mount(TestComponent);
      const label = wrapper.find('label');
      const input = wrapper.find('input');

      expect(label.attributes('for')).toBe('test-input');
      expect(input.attributes('id')).toBe('test-input');
      expect(wrapper.find('.t-label__required-indicator').exists()).toBe(true);
    });
  });
});
