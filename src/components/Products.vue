<script>
import axios from 'axios'
import { RouterLink, useRoute } from 'vue-router'
export default {
    name: 'Products',

    data() {
        return {
            products: [],
            DestroyFlag: false,
            result: null,
            message: null,
            category: null
        }
    },

    methods: {
        async backPage() {
            await this.$router.go()
        },


        async deleteProduct(id) {
            await axios
                    .delete(`http://localhost:3000/products/${id}`)
                    .then((response) => {
                        if(response.status == 201) {
                            this.DestroyFlag = true
                        }
                    })
                    .catch(error => this.DestroyFlag = false)

            let query = {
                result: 'error', 
                msg: 'Não foi possível remover o produto!'
            }; 
            
            if(this.DestroyFlag) {
                query.result = 'success'
                query.msg = 'Produto removido com sucesso'
            }

            this.$router.go(query)            

        }, 

        async displayAlert() {
            const el = document.querySelector("#message");

            if (this.result == 'success') {
                el.classList.add('bg-green-200')
                el.classList.add('text-green-950')
            } else {
                el.classList.add('bg-red-200')
                el.classList.add('text-red-950')
            }

            el.classList.remove("hidden");
            await setTimeout(this.hideMessage, 5000)
        },

        hideMessage() {
            const el = document.querySelector("#message")
            el.classList.add("hidden")
        },

        async getNameCategory(CategoryId) {
            await axios
                .get(`http://localhost:3000/categories/${CategoryId}`)
                .then((response) => {
                    if (response.status == 201 || response.status == 200) {
                        this.category = response.data.name
                    }

                    if (response.status == 404) {
                        this.category = 'Não Vinculado a uma categoria'
                    }
                })
                .catch(error => console.log(error))
        }, 

        hideSpinner() {
            const spinnerElement = document.querySelector('#loading')
            spinnerElement.classList.add("hidden")  
        }
        
    },

    beforeMount() {
        const spinnerElement = document.querySelector('#loading')
        spinnerElement.classList.remove('hidden')     
    }, 

    async mounted() {

        setTimeout(this.hideSpinner, 1000)

        const router = useRoute()

        if (router.query && router.query.result) {
            this.result = router.query.result
            this.message = router.query.msg
            this.displayAlert()
        }

        await axios
                .get('http://localhost:3000/products')
                .then(response => (this.products = response.data))
                .catch(error => console.log(error))
    }
}

</script>

<template>
    <div id="message"
        class="fixed top-0 right-0 text-bold text-center py-8 px-8 rounded-lg text-sm z-50 shadow-xl hidden">
        {{ message }}
    </div>
    <div class="relative px-6 py-6 bg-white border-gray-100 w-full rounded-lg shadow-md lg:mt-24 md:mt-60">

        <div class="grid grid-cols-3 gap-4 w-full">
            <div class="col-span-2">
                <h2 class="font-bold text-xl">
                    <button @click="backPage" class="text-2xl hover:text-slate-300">
                        <i class="fa-solid fa-arrow-left mr-4"></i>
                    </button>
                    Lista Produtos
                </h2>
            </div>
            <div class="flex justify-end">
                <RouterLink title="Nova Categoria" to="/NewProduct"
                    class="bg-blue-400 text-white text-2xl px-3 rounded-lg shadow-lg">+
                </RouterLink>
            </div>
        </div>

        <table
            class="table-auto mt-12 border-collapse border-spacing-1 border border-slate-400 p-0 rounded-lg lg:w-36 md:w-full w-full">
            <thead class="bg-gray-100 py-3 px-3 ">
                <tr class="py-3 px-3 text-center">
                    <th class="border border-slate-300 px-28 py-2 text-center font-semibold">Produto</th>
                    <th class="border border-slate-300 px-48 py-2 text-center font-semibold">Descricao</th>
                    <th class="border border-slate-300 px-16 py-2 text-center font-semibold">Preço</th>
                    <th class="border border-slate-300 px-16 py-2 text-center font-semibold">Medida</th>
                    <th class="border border-slate-300 px-16 py-2 text-center font-semibold">Ações</th>
                </tr>
            </thead>
            <tbody class="border-slate-400">
                <tr v-for="product in products" :key="product.id">
                    <td class="text-center py-3 border border-slate-300">{{ product.name }}</td>
                    <td class="text-center py-3 border border-slate-300">{{ product.description }}</td>
                    <td class="text-center py-3 border border-slate-300">{{ product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}</td>
                    <td class="text-center py-3 border border-slate-300">{{ product.measure }}</td>
                    <td class="text-center py-6 border border-slate-300">

                        <!-- Show -->
                        <RouterLink 
                            :to="{
                                name: 'ShowProduct',
                                params: {
                                    ProductId: product.id
                                }
                            }" 
                            class="text-slate-500 hover:text-slate-300">
                            <i class="fa-solid fa-eye"></i>
                        </RouterLink>

                        <RouterLink 
                            :to="{
                                name: 'EditProduct', 
                                params: {
                                    ProductId: product.id
                                }
                            }"
                            class="text-slate-500 hover:text-slate-300">
                            <i class="fa-solid fa-pen-to-square ml-2"></i>
                        </RouterLink>

                        <!-- Delete -->
                        <button @click="deleteProduct(product.id)" class="ml-2 hover:cursor-pointer">
                            <i class="fa-solid fa-trash"></i>
                        </button>

                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>
