<script>
import { onMounted, reactive, ref } from 'vue';

export default {
    name: 'Count',

     setup() {
        
        const obj = reactive({
            count: 0              
        })
        
        const increment = () => {
            obj.count++
        }
        
        return {
            increment, 
            obj
        }
    }   
}
</script>

<template>
    <div class="relative px-6 py-6 bg-white border-gray-100 w-full rounded-lg shadow-md lg:mt-24 md:mt-60">
        
        <button 
            class="text-white bg-cyan-700 py-3 px-3 rounded-xl hover:bg-cyan-300" 
            @click="increment">Count is : {{obj.count}}</button>
    </div>
</template>