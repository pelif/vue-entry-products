<script>

import axios from 'axios'

export default {
    name: 'Categories',

    data() {
        return {
            categories: []
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
    <div class="px-6 py-6 bg-white border-gray-100 mt-6 w-full rounded-lg shadow-md">
        <h2 class="font-bold">Lista Categories</h2>

        <table class="table-auto mt-12 border-collapse border-spacing-1 border border-slate-400 p-0 rounded-lg">
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
                    <td class="text-center py-3 border border-slate-300">...</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>