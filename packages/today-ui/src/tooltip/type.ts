

import { Placement } from '@floating-ui/vue';
import { AttachNode } from '../shared/type'


export interface TTooltipProps {
    /**
     * 制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body
     * @default 'body'
     */
    attach?: AttachNode;
    placement: Placement;
    label: string;
    offset: number;
}