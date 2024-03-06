import { createRouter, createWebHistory } from 'vue-router'
import Test from '@/components/Test.vue'
import Count from '@/components/Count.vue'
import Categories from '@/components/Categories.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/count',
      name: 'count',
      component: Count
    }
  ]
})

export default router
