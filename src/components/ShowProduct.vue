<script>
import axios from 'axios';

export default {
    name: 'ShowProduct', 

    data() {
        return {
            ProductId: null, 
            ObjProduct: null, 
            category: null
        }
    }, 

    methods: {
        async getProduct(id) {
            await axios
                    .get(`http://localhost:3000/products/${id}`)
                    .then(response => (this.ObjProduct = response.data))
                    .catch(error => console.log(error))
        }, 

        backPage() {
            this.$router.back()
        }, 

        async getNameCategory(CategoryId) {
            await axios
                    .get(`http://localhost:3000/categories/${CategoryId}`)
                    .then((response) => {         
                        if(response.status == 201 || response.status == 200) {
                            this.category = response.data.name                        
                        }                
                        
                        if(response.status == 404) {
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

    mounted() {
        setTimeout(this.hideSpinner, 1000)
        this.ProductId = this.$route.params.ProductId
        this.getProduct(this.ProductId)
        this.getNameCategory(this.ProductId)
    }
}
</script>

<template>
    <div class="relative px-6 py-6 bg-white border-gray-100 w-full rounded-lg shadow-md lg:mt-24 md:mt-60">
        <h2 class="font-bold text-xl">
            <button @click="backPage" class="text-2xl hover:text-slate-300">
                <i class="fa-solid fa-arrow-left mr-4"></i>
            </button>
            Visualizar Produto            
        </h2>
        <span v-if="ObjProduct">
            {{  ObjProduct.name }}
        </span>

        <div class="grid grid-cols-2 gap-4 w-full py-14">
            <div>
                <strong class="text-sm bg-slate-100 py-2 px-28 border border-slate-200 rounded-lg">Produto: </strong>
                <h3 class="text-sm mt-4" v-if="ObjProduct">{{ ObjProduct.name }}</h3>
            </div>
            <div>
                <strong class="text-sm bg-slate-100 py-2 px-28 border border-slate-200 rounded-lg">Descrição: </strong>
                <h3 class="text-sm mt-4" v-if="ObjProduct">{{ ObjProduct.description }}</h3>
            </div>
            <div>
                <strong class="text-sm bg-slate-100 py-2 px-28 border border-slate-200 rounded-lg">Preço: </strong>
                <h3 class="text-sm mt-4" v-if="ObjProduct">{{ ObjProduct.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) }}</h3>
            </div>
            <div>
                <strong class="text-sm bg-slate-100 py-2 px-28 border border-slate-200 rounded-lg">Medida: </strong>
                <h3 class="text-sm mt-4" v-if="ObjProduct">{{ ObjProduct.measure }}</h3>
            </div>
            <div>
                <strong class="text-sm bg-slate-100 py-2 px-28 border border-slate-200 rounded-lg">Detalhes: </strong>
                <h3 class="text-sm mt-4" v-if="ObjProduct">{{ ObjProduct.details }}</h3>
            </div>
            <div>
                <strong class="text-sm bg-slate-100 py-2 px-28 border border-slate-200 rounded-lg">Categoria: </strong>
                <h3 class="text-sm mt-4" v-if="ObjProduct">{{ category }}</h3>
            </div>
        </div>
    </div>
</template>