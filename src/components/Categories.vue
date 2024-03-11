<script>

import axios from 'axios'
import { RouterLink, useRoute } from 'vue-router'

export default {
    name: 'Categories',

    data() {
        return {
            categories: [],             
            destroy: false
        }
    },

    methods: {
        destroy(id) {
            axios   
                .delete(`http://localhost:3000/categories/${id}`)
                .then((response) => {
                    // if(response.status == 201) {
                    //     this.destroy = true;
                    // }
                    console.log(response.data)
                })
                .catch((error) => console.log(error))
                // .catch((error) => (this.destroy = false))
        }
    }, 

    mounted() {
        axios
            .get('http://localhost:3000/categories')
            .then(response => (this.categories = response.data))
            .catch(error => console.log(error))
    }

}
</script>

<template>
    <div class="relative px-6 py-6 bg-white border-gray-100 w-full rounded-lg shadow-md lg:mt-24 md:mt-60">
        <div class="grid grid-cols-3 gap-4 w-full">
            <div class="col-span-2">
                <h2 class="font-bold">Lista Categories</h2>
            </div>
            <div class="flex justify-end">
                <RouterLink 
                    title="Nova Categoria" 
                    to="/newCategory"
                    class="bg-blue-400 text-white text-2xl px-3 rounded-lg shadow-lg">
                    +
                </RouterLink>
            </div>
        </div>

        <table class="table-auto mt-12 border-collapse border-spacing-1 border border-slate-400 p-0 rounded-lg lg:w-36 md:w-full">
            <thead class="bg-gray-100 py-3 px-3 ">
                <tr class="py-3 px-3 text-center">
                    <th class="border border-slate-300 px-28 py-2 text-center font-semibold">Categoria</th>
                    <th class="border border-slate-300 px-48 py-2 text-center font-semibold">Descricao</th>
                    <th class="border border-slate-300 px-16 py-2 text-center font-semibold">Ações</th>
                </tr>
            </thead>
            <tbody class="border-slate-400">
                <tr v-for="category in categories" :key="category.id">
                    <td class="text-center py-3 border border-slate-300">{{ category.name }}</td>
                    <td class="text-center py-3 border border-slate-300">{{ category.description }}</td>
                    <td class="text-center py-3 border border-slate-300">
                        
                        <!-- Show -->
                        <RouterLink 
                            :to="{ 
                                name: 'ShowCategory', 
                                params: {
                                    CategoryId: category.id 
                                }
                            }" 
                            class="text-slate-500 hover:text-slate-300">
                            <i class="fa-solid fa-eye"></i>
                        </RouterLink>
                        
                        <!-- edit -->
                        <RouterLink 
                            :to="{ 
                                name: 'EditCategory', 
                                params: {
                                    CategoryId: category.id 
                                }
                            }" 
                            class="text-slate-500 hover:text-slate-300">
                            <i class="fa-solid fa-pen-to-square ml-2"></i>
                        </RouterLink>    

                        <!-- Delete -->
                        <i 
                            @click.prevent="destroy(category.id)"
                            class="fa-solid fa-trash ml-2 hover:cursor-pointer"></i>
                        
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>