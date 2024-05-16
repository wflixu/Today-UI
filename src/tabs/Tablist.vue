<template>
    <div class="tablist">
        <div class="btns-box">
            <div class="btns">
             <div class="btn" v-for="option in tabOptions" :key="option.key" :class="{'active': option.key === activeKey}" 
             @click="onClick(option.key)">
                <span class="title">
                    {{ option.title }}
                </span>
                <span class="close" @click.stop="handleClose(option.key)">
                    <DismissFilled/>
                </span>
            </div>
          </div>
        </div>
        <slot>
        </slot>
    </div>
</template>

<script setup lang="ts">
import './tablist.css'
import {ref, reactive, provide} from 'vue';
import DismissFilled from "../icon/components/DismissFilled";
import type {ITabOption} from './type';
import { TABS_OPTIONS_KEY, TAB_ACTIVE_KEY } from './props';

const activeKey = defineModel({ type: String })

defineOptions({
    name: 'TTablist',
})

const emit = defineEmits<{
  (e: 'change', key: string): void
  (e: 'close', key: string): void
}>()


const tabOptions = reactive<ITabOption[]>([]);

provide(TABS_OPTIONS_KEY, tabOptions);
provide(TAB_ACTIVE_KEY, activeKey)

const onClick = (key: string) => {
    activeKey.value = key;
    emit('change', key);
}
const handleClose = (key: string) =>{
  emit('close', key)
}


</script>

