<script>
    import axios from 'axios'
    
    export default {
        name: 'NewCategory', 

        data() {
            return {
                form: {
                    name: '', 
                    description: ''
                }, 
                SaveCategory: false             
            }
        }, 

        methods: {
            async submit() {
                
                await axios
                    .post('http://localhost:3000/categories', {
                        name: this.form.name, 
                        description: this.form.description
                    })
                    .then((response) => {                              
                        if(response.status == 201) {                            
                            this.SaveCategory = true;                                  
                        }
                    })
                    .catch((error) => (this.SaveCategory = false)); 

                    let query = {
                        result: 'error', 
                        msg: 'Não foi possível cadastrar o produto'
                    } 

                    if(this.SaveCategory) {
                        query.result = 'success'
                        query.msg = 'Categoria Criada com Sucesso!'
                    } 

                    this.$router.push({path: '/categories', query})    
            }, 
            
            backPage() {
                this.$router.back()
            }
        }

    }
</script>

<template>
    <div class="relative px-6 py-6 bg-white border-gray-100 w-full rounded-lg shadow-md lg:mt-24 md:mt-60">
        <h2 class="font-bold text-lg">
            <button @click="backPage" class="text-2xl hover:text-slate-300">
                <i class="fa-solid fa-arrow-left mr-4"></i>
            </button>
            Nova Categoria</h2>
        <form>
            <div class="grid grid-cols-2 gap-4 w-full py-14">            
                <div>
                    <label for="name" class="w-full">Categoria</label><br>
                    <input 
                        type="text"                
                        class="form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                        v-model="form.name">
                </div>   
                <div>
                    <label for="Descrição">Descrição</label><br>
                    <input 
                        type="text"
                        class="form-input w-full mt-3 rounded-lg text-gray-700 py-3 px-3 border-2 border-gray-400"
                        v-model="form.description">
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