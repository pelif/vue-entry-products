<script>
import axios from 'axios'

    export default {
        name: 'EditCategory', 

        data() {
            return {
                CategoryId: null, 
                ObjCategory: null, 
                saves: false
            }
        },

        methods: {
            getCategory(id) {
                axios
                    .get('http://localhost:3000/categories/' + id)
                    .then(response => (this.ObjCategory = response.data))
                    .catch(error => console.log(error))
            }, 

            async submit() {
               
                axios
                    .put('http://localhost:3000/categories/' + this.ObjCategory.id, {
                        name: this.ObjCategory.name, 
                        description: this.ObjCategory.description
                    })
                    .then((response) => {
                        // console.log(response.data)
                        if(response.status == 201) {
                            this.saves = true;
                        }
                    })                    
                    .catch((error) => (this.saves = false))

                let params = {
                    result: 'error', 
                    msg: 'Não foi possível alterar a categoria!'
                }; 
                
                if(this.saves) {
                    params.result = 'success'
                    params.msg = 'Categoria alterada com sucesso!'
                }

                this.$router.push({path: '/categories', params})
            }
        }, 
    
        mounted() {        
            this.CategoryId = this.$route.params.CategoryId        
            this.getCategory(this.CategoryId)
        }
    }
</script>

<template>
    <div class="relative px-6 py-6 bg-white border-gray-100 w-full rounded-lg shadow-md lg:mt-24 md:mt-60">
        <form v-if="ObjCategory">
        
            <h2 class="font-bold text-xl">Edição Categoria </h2>
            <span>
                {{  this.CategoryId }} - {{ ObjCategory.name }}
            </span>     
            
            
                <div class="grid grid-cols-2 gap-4 w-full py-14">            
                    <div>
                        <label for="name" class="w-full">Categoria</label><br>
                        <input 
                            type="text"                
                            class="form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                            v-model="ObjCategory.name">
                    </div>   
                    <div>
                        <label for="Descrição">Descrição</label><br>
                        <input 
                            type="text"
                            class="form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                            v-model="ObjCategory.description">
                    </div>
                </div>    
                <div class="w-full">
                    <button @click="$router.go(-1)" class="w-44 font-bold bg-blue-400 hover:bg-blue-300 text-white px-2 py-2 rounded-lg">
                        Voltar
                    </button>
                    <button @click.prevent="submit" class="w-44 ml-4 font-bold bg-blue-400 hover:bg-blue-300 text-white px-2 py-2 rounded-lg">
                        Salvar
                    </button>
                </div>  
        </form>
    </div>
</template>