// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/base/Home.vue'),
      },
      {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/views/base/Signup.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/base/About.vue'),
      },
      {
        path: '/create/board',
        name: 'CreateBoard',
        component: () => import('@/components/create/Board.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
