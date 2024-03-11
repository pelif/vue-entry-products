import { createRouter, createWebHistory } from 'vue-router'
import Categories from '@/components/Categories.vue'
import NewCategory from '@/components/NewCategory.vue'
import ShowCategory from '@/components/ShowCategory.vue'
import EditCategory from '@/components/EditCategory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/newCategory',
      name: 'newCategory',
      component: NewCategory
    },
    {
      path: '/ShowCategory/:CategoryId',
      name: 'ShowCategory',
      component: ShowCategory
    },
    {
      path: '/EditCategory/:CategoryId',
      name: 'EditCategory',
      component: EditCategory
    },  
  
  ]
})

export default router
