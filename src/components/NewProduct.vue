<script>
import axios from 'axios';

export default {
    name: 'NewProduct', 
    
    data() {
        return {
            form: {
                name: '', 
                description: '', 
                price: '', 
                measure: '', 
                details: '', 
                category_id: ''
            }, 
            ObjCategory: null, 
            saves: false
        }
    }, 

    methods: {
       
        async submit() {
            await axios
                    .post('http://localhost:3000/products', {
                        name: this.form.name, 
                        description: this.form.description, 
                        price: this.form.price, 
                        measure: this.form.measure, 
                        details: this.form.details, 
                        category_id: this.form.category_id
                    })
                    .then((response) => { 
                        if(response.status == 201) 
                            this.saves = true
                    })    
                    .catch((error) => this.saves = false);     

            let query = {
                result: 'error', 
                msg: 'Não foi possível cadastrar o produto!'
            }; 

            if(this.saves) {
                query.result = 'success'
                query.msg = 'Produto cadastrado com sucesso!'
            }

            this.$router.push({ path: '/products', query})
        }, 

        backPage() {
            this.$router.back()
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
        
        setTimeout(this.hideSpinner, 2000)
        
        await axios 
                .get(`http://localhost:3000/categories`)
                .then(response => (this.ObjCategory = response.data))
                .catch(error => console.log('Dont Get Category: ' + error))
    }
}
</script>

<template>
    <div class="relative px-6 py-6 bg-white border-gray-100 w-full rounded-lg shadow-md lg:mt-24 md:mt-60">
        <h2 class="font-bold text-lg">
            <button @click="backPage" class="text-2xl hover:text-slate-300">
                <i class="fa-solid fa-arrow-left mr-4"></i>
            </button>
            Novo Produto
        </h2>

        <form>
            <div class="grid grid-cols-2 gap-4 w-full py-14">
                <div>
                    <label for="category_id" class="w-full">Categorias</label><br>
                    <select 
                        name="category_id" 
                        id="category_id" 
                        class="bg-white form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                        v-model="form.category_id">
                        <option class="py-6 px-3" value="Selecione uma Categoria">SELECIONE UMA CATEGORIA</option>
                        <option v-for="category in ObjCategory" :value="category.id">{{ category.name.toUpperCase() }}</option>
                    </select>
                </div>
                <div>
                    <label for="name" class="w-full">Nome do Produto</label><br>
                    <input 
                        type="text" 
                        class="form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                        v-model="form.name">
                </div>
                <div>
                    <label for="description" class="w-full">Descrição do Produto</label><br>
                    <input 
                        type="text" 
                        class="form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                        v-model="form.description">
                </div>
                <div>
                    <label for="price" class="w-full">Preço</label><br>
                    <input 
                        type="text" 
                        class="form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                        v-model="form.price">
                </div>
                <div>
                    <label for="measure" class="w-full">Medida</label><br>
                    <input 
                        type="text" 
                        class="form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                        v-model="form.measure">
                </div>
                <div>
                    <label for="details" class="w-full">Detalhes</label><br>
                    <textarea  
                        rows="5"                       
                        class="form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                        v-model="form.details">
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