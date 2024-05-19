import { defineComponent } from "vue";
import './tablist.css'
import { ref, reactive, provide } from 'vue';
import DismissFilled from "../icon/components/DismissFilled";
import type { ITabOption } from './type';
import { TABS_OPTIONS_KEY, TAB_ACTIVE_KEY } from './props';

export default defineComponent({
    name: "Tablist",
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    emits: ['close', 'change', 'update:modelValue'],
    setup(props, { emit, slots }) {

        const tabOptions = reactive<ITabOption[]>([]);
        const activeKey = ref<string>(props.modelValue);
        const handleClose = (event: MouseEvent, key: string) => {
            event.stopPropagation()
            emit('close', key)
        }
        const handleClick = (key: string) => {
            activeKey.value = key;
            emit('change', key);
            emit('update:modelValue', key);
        }

        provide(TABS_OPTIONS_KEY, tabOptions);
        provide(TAB_ACTIVE_KEY, activeKey);

        return () => (
            <div class="tablist">
                <div class="tablist">
                    <div class="btns-box">
                        <div class="btns">
                            {
                                tabOptions.map(({ key, title }, index) => {

                                    return (
                                        <div key={key} class={['btn', key === activeKey.value ? 'active' : '']} onClick={() => handleClick(key)} >
                                            <span class="title">
                                                {title}
                                            </span>
                                            <span class="close" onClick={(event) => handleClose(event, key)}>
                                                <DismissFilled />
                                            </span>
                                        </div>

                                    )
                                }
                                )
                            }

                        </div >
                    </div >
                    {
                        slots.default && slots.default()
                    }

                </div >
            </div >
        )
    }

});