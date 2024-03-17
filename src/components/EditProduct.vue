<script>
import axios from 'axios';

export default {
    name: 'EditProduct', 

    data() {
        return {
            ProductId: null, 
            ObjProduct: null, 
            saves: false, 
            categories: [], 
            form: {
                name: '', 
                description: '', 
                price: '', 
                measure: '', 
                details: '', 
                category_id: ''
            }
        }
    }, 
    
    methods: {
        async getProduct(id) {
            await axios
                    .get(`http://localhost:3000/products/${id}`)
                    .then(response => (this.ObjProduct = response.data))
                    .catch(error => console.log(error))
        }, 

        async submit() {
            await axios
                    .put(`http://localhost:3000/products/${this.ObjProduct.id}`, {
                        name: this.ObjProduct.name, 
                        description: this.ObjProduct.description, 
                        price: this.ObjProduct.price, 
                        measure: this.ObjProduct.measure, 
                        details: this.ObjProduct.details, 
                        category_id: this.ObjProduct.category_id
                    })
                    .then(response => {
                        if(response.status == 201 || response.status == 200) {
                            this.saves = true
                        }
                    })
                    .catch(error => this.saves = false)

            let params = {
                result: 'error', 
                msg: 'Não foi possível alterar o produto'
            }; 
            
            if(this.saves) {
                params.result = 'success'
                params.msg = 'Produto alterado com sucesso!'
            }

            this.$router.push({ path: '/products', params})
        }, 

        async backPage() {
            await this.$router.back()
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
        setTimeout(this.hideSpinner, 2000)
        axios
            .get(`http://localhost:3000/categories`)
            .then(response => (this.categories = response.data))
            .catch(error => console.log('Dont Get Category : ' + error))

        this.ProductId = this.$route.params.ProductId
        this.getProduct(this.ProductId)            
    }
}
</script>

<template>
    <div class="relative px-6 py-6 bg-white border-gray-100 w-full rounded-lg shadow-md lg:mt-24 md:mt-60">
        <h2 class="font-bold text-lg">
            <button @click="backPage" class="text-2xl hover:text-slate-300">
                <i class="fa-solid fa-arrow-left mr-4"></i>
            </button>
            Editar Produto
        </h2>

        <form v-if="ObjProduct">
            <div class="grid grid-cols-2 gap-4 w-full py-14">
                <div>
                    <label for="category_id" class="w-full">Categorias</label>
                    <select 
                        name="category_id" 
                        id="category_id"
                        class="bg-white form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400">
                        <option value="">SELECIONE UMA CATEGORIA</option>
                        <option 
                            v-for="category in categories" 
                            :value="category.id" 
                            :selected="category.id == ObjProduct.category_id">
                            {{ category.name.toUpperCase() }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="name" class="w-full">Nome do Produto</label><br>
                    <input 
                        type="text" 
                        class="form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                        v-model="ObjProduct.name">
                </div>
                <div>
                    <label for="description" class="w-full">Descrição do Produto</label><br>
                    <input 
                        type="text" 
                        class="form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                        v-model="ObjProduct.description">
                </div>
                <div>
                    <label for="price" class="w-full">Preço</label><br>
                    <input 
                        type="text" 
                        class="form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                        v-model="ObjProduct.price">
                </div>
                <div>
                    <label for="measure" class="w-full">Medida</label><br>
                    <input 
                        type="text" 
                        class="form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                        v-model="ObjProduct.measure">
                </div>
                <div>
                    <label for="details" class="w-full">Detalhes</label><br>
                    <textarea  
                        rows="5"                       
                        class="form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                        v-model="ObjProduct.details">
                    </textarea>
                </div>               
            </div>
            <div class="w-full">
                <button @click="backPage" class="w-44 font-bold bg-blue-400 hover:bg-blue-300 text-white px-2 py-2 rounded-lg">
                    Voltar
                </button>
                <button @click.prevent="submit" class="w-44 ml-4 font-bold bg-blue-400 hover:bg-blue-300 text-white px-2 py-2 rounded-lg">
                    Salvar
                </button>
            </div>              
        </form>
    </div>
</template>