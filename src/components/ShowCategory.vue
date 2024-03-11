<script>
import axios from 'axios'

export default {
    name: 'ShowCategory', 

    data() {
        return {
            CategoryId: null, 
            ObjCategory: null
        }
    },

    methods: {
        getCategory(id) {
            axios
                .get('http://localhost:3000/categories/' + id)
                .then(response => (this.ObjCategory = response.data))
                .catch(error => console.log(error))
        }
    }, 
    
    mounted() {        
        this.CategoryId = this.$route.params.CategoryId        
        this.getCategory(this.CategoryId)
    },     
}
</script>

<template>
    <div class="relative px-6 py-6 bg-white border-gray-100 w-full rounded-lg shadow-md lg:mt-24 md:mt-60">
        <h2 class="font-bold text-xl">Visualizar Categoria </h2>
        <span v-if="ObjCategory">
            {{  this.CategoryId }} - {{ ObjCategory.name }}
        </span>        

        <div class="grid grid-cols-2 gap-4 w-full py-14">
            <div>
                <strong class="text-sm bg-slate-100 py-2 px-28 border border-slate-200 rounded-lg">Categoria: </strong>
                <h3 class="text-sm mt-4" v-if="ObjCategory">{{  ObjCategory.name }}</h3>
            </div>
            <div>
                <strong class="text-sm bg-slate-100 py-2 px-28 border border-slate-200 rounded-lg">Descrição: </strong>
                <h3 class="text-sm mt-4" v-if="ObjCategory">{{ ObjCategory.description }}</h3>
            </div>
        </div>
    </div>
</template>