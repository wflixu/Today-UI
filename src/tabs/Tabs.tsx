import { computed, defineComponent } from "vue";

import DismissFilled from "../icon/components/DismissFilled";

import { tabsProps } from "./props";
import type { ITabOption, TabsProps } from "./type";

import "./tabs.css";


export default defineComponent({
    name: "TTabs",
    props: tabsProps,
    emits: ["close", "change", "update:activeKey"],
    setup(props: TabsProps, { emit }) {

        const onClose = (tab: ITabOption, event: MouseEvent) => {
            event.stopPropagation();
            emit("close", tab.key);
        }

        const onTabClick = (tab: ITabOption, event: MouseEvent) => {
            event.stopPropagation();
            emit("update:activeKey", tab.key);
            emit("change", tab.key);
        }


        return () => {
            return (
                <div class="t-tablist">
                    {props.options.map((tab, index) => {
                        return (<div class={['t-tablist-tab', tab.key == props.activeKey ? 't-tab-active' : '']} key={tab.key} onClick={(event) => onTabClick(tab, event)}>
                            {tab.title}
                            <span class="tab-close" onClick={(event) => onClose(tab, event)}>
                                <DismissFilled />
                            </span>
                        </div>)
                    })}
                </div >
            );
        };
    },
});
