

import {createRouter,createWebHashHistory} from 'vue-router'

import Navi from './page/Navi.vue'
import TooltipPlay from './page/TooltipPlay.vue'

export const routes = [
  {
    path:'/',
    name:'navi',
    component: Navi
  },
  {
    path:'/tooltip',
    name:'tooltip',
    component: TooltipPlay
  },
   
]

export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })