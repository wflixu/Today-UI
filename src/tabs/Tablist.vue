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

<style scoped>
.tablist {
    .btns-box {
        .btns {
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--colorCompoundBrandStroke);
          .btn {
            display: inline-flex;
            height: 36px;
            align-items: center;
            justify-content: space-between;
            border-width: 1px;
            position: relative;
            border-top-left-radius: var(--borderRadiusMedium);
            border-top-right-radius: var(--borderRadiusMedium);
            border-style: solid;
            gap: 8px;
            border-color: transparent;
            padding: 0 8px;
            &::after {
                    content: "";
                    position: absolute;
                    left: -1px;
                    right: -1px;
                    bottom: -2px;
                    height: 1px;
                    background-color: var(--colorCompoundBrandStroke);
            }
            &.active {
                border-color: var(--colorCompoundBrandStroke);
                border-bottom-color:  transparent;
                &::after {
                  background-color: whitesmoke;
                }
            }
            .title {
                flex: 1;
            }
            .close {
                width: 18px;
                display: inline-flex;
                align-items: center;
                &:hover {
                    color: var(--colorCompoundBrandStroke);
                }
            }
          }
        }
    }
   
}
</style>