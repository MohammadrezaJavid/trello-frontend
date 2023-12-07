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
        path: '/signout',
        name: 'Signout',
        component: () => import('@/views/base/Signout.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/base/About.vue'),
      },
      {
        path: '/board',
        name: 'Board',
        component: () => import('@/components/Board.vue'),
      },
      {
        path: '/cb',
        name: 'CreateBoard',
        component: () => import('@/components/CreateBoard.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
