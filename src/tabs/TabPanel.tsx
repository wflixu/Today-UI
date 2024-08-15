import { defineComponent } from "vue";
import { computed, getCurrentInstance, inject, onMounted, unref, type Ref } from 'vue';
import { TAB_ACTIVE_KEY, TABS_OPTIONS_KEY } from './props';
import type { ITabOption } from './type';

export default defineComponent({
    name: "TabPanel",
    props: {
        title: {
            type: String,
            default: ""
        }
    },

    setup(props, { emit, slots }) {
        const tabOpitons = inject<ITabOption[]>(TABS_OPTIONS_KEY)
        const activeKey = inject<Ref<string>>(TAB_ACTIVE_KEY)

        const inst = getCurrentInstance()
        const key = inst?.vnode.key as string
        console.log('setup:', props.title, activeKey)
        const show = computed(() => {
            return unref(activeKey) === key
        })
        onMounted(() => {
            tabOpitons?.push({
                title: props.title,
                key
            })
        })


        return () => (
            <div class="tablist-panel">
                {show.value && slots.default?.()}
            </div>

        )
    }
})