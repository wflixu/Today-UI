
import {createRouter,createWebHashHistory} from 'vue-router'

import TooltipPlayVue from '../page/TooltipPlay.vue'
import UseFloatingVue from '../page/UseFloating.vue'
import Navi from './../page/Navi.vue'

export const routes = [
  {
    path:'/',
    name:'navi',
    component: Navi
  },
  {
    path:'/tooltip',
    name:'tooltip',
    component: TooltipPlayVue
  },
  {
    path:'/use-floating',
    name:'use-floating',
    component: UseFloatingVue
  },
]

export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })


  
  