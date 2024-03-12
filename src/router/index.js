import { createRouter, createWebHistory } from 'vue-router'
import Categories from '@/components/Categories.vue'
import NewCategory from '@/components/NewCategory.vue'
import ShowCategory from '@/components/ShowCategory.vue'
import EditCategory from '@/components/EditCategory.vue'
import Products from '@/components/Products.vue'
import NewProduct from '@/components/NewProduct.vue' 
import ShowProduct from '@/components/ShowProduct.vue'
import EditProduct from '@/components/EditProduct.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Categorias
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

    //Produtos
    {
      path: '/products', 
      name: 'products', 
      component: Products
    }, 
    {
      path: '/NewProduct', 
      name: 'NewProduct', 
      component: NewProduct
    }, 
    {
      path: '/ShowProduct/:ProductId', 
      name: 'ShowProduct', 
      component: ShowProduct
    }, 
    {
      path: '/EditProduct:/ProductId', 
      name: 'EditProduct', 
      component: EditProduct
    }, 
  
  ]
})

export default router
