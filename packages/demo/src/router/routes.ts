import HomeView from '../views/HomeView.vue';
import LayoutAdmin from '@/layout/admin/LayoutAdmin.vue';
import { floatingRoute } from '@/views/floating/route';


export const routes = [
    {
      path: '/',
      name: 'Root',
      component: LayoutAdmin,
      redirect:'/home',
      children: [
        {
          path: 'home',
          name: 'Home',
          component:HomeView
        },
        floatingRoute
      ]
    }
]