<script lang="ts" setup>
import { reactive, ref } from 'vue'
import TButton from './Button'

const state = reactive({
  disabled: false,
  content: 'Hello world',
})

const message = ref('Meow!')
</script>

<template>
  <Story title="Basic/Button" >
    <Variant title="默认">
        <TButton>
           哈哈
        </TButton>
    </Variant>
    <Variant title="默认">
        <TButton>
           哈哈
        </TButton>
    </Variant>
  </Story>
</template>

<docs lang="md">
    # My documentation
</docs>

