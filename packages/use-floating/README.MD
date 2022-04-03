# use-floating

@floating-ui/dom 是一个很好用的浮动元素的库，官方实现了 @floating-ui/react-dom。想在vue3中使用 @floating-ui/dom，所以实现了一个对标@floating-ui/react-dom  的库。这是一个 composition api hooks 库，组件准备在today-ui 中实现，对标官方的 @floating-ui/react-dom-interactions；

# using

```
# npm
npm i use-floating 

# npm
yarn add use-floating 

```


# demo

```
<script setup lang="ts">

import { computed, toRefs } from 'vue'
import { useFloating,useFloating,shift, flip, offset } from 'use-floating'

const { x, y, floating, reference } = toRefs(useFloating({
  placement: 'top',
  strategy: 'absolute',
  middleware: [flip(), offset(10), shift()],
}));

const tipStyle = computed(() => {
  return {
    top: `${y.value}px`,
    left: `${x.value}px`
  }
})
</script>
<template>
  <div>
    <button :ref="reference">drop</button>
    <div :ref="floating" class="t-floating" :style="tipStyle">
      tooltip content Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, esse velit magnam dolor nobis quod nihil enim totam debitis fugit.
      Blanditiis, magni pariatur natus autem dolorum sapiente quae dolor adipisci.
    </div>

    <h1>use floating</h1>
    <div>
      x:{{ x }}
      y:{{ y }}
      {{ tipStyle }}
    </div>
  </div>
</template>

<style scoped>
.t-floating {
  position: absolute;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #999;
  color: white;
}
</style>


```




