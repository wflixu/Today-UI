<script lang="ts" setup>
import { reactive, ref } from 'vue'
import TButton from './Button'
import { ButtonProps } from '..';

const state = reactive({
  disabled: false,
  shape: 'circular' as ButtonProps['shape'], 
  type: 'default' as ButtonProps['type'],
  size: 'medium' as  ButtonProps['size']
})


const typeOptions = {
    'default': 'default',
    'primary': 'primary',
    'outline': 'outline',
    'subtle':'subtle',
    'transparent':'transparent'
  }

  const shapeOptions = {
    "rounded":"rounded", 
    "circular":"circular",
     "square":"square"
  }
  const sizeOptions = {
    'small': 'small',
    'medium':'medium',
    'large': 'large'
  }
</script>

<template>
  <Story title="Basic/Button" >
    <template #controls>
          <HstSelect v-model="state.type" :title="'type'" :options="typeOptions"/>
          <HstSelect v-model="state.shape" title="shape" :options="shapeOptions"/>
          <HstSelect v-model="state.size" title="size" :options="sizeOptions"/>
           <HstCheckbox v-model="state.disabled" title="Disabled" />
      </template>
    <Variant title="默认">
        <TButton :type="state.type" :shape="state.shape" :disabled="state.disabled">
          默认按钮
        </TButton>
    </Variant>
    <Variant title="shape">
        <TButton :shape="state.shape">
          shape： {{ state.shape }}
        </TButton>
    </Variant>
    <Variant title="type">
        <TButton :type="state.type">
          type: {{ state.type }}
        </TButton>
    </Variant>
    <Variant title="size">
        <TButton :size="state.size">
          size: {{ state.size }}
        </TButton>
    </Variant>
    <Variant title="disabled">
        <TButton :disabled="state.disabled">
          disabled: {{ state.disabled }}
        </TButton>
    </Variant>
  </Story>
</template>

<docs lang="md">
    # My documentation
</docs>

