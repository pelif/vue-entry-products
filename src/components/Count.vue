<script>
    export default {
        name: 'Count', 
        
        data() {
            return {
                count: 0
            }
        }, 

        methods: {
            increment() {
                this.count++
            }
        }, 

        mounted() {
            console.log(`The initial count is ${this.count} `)
        }
    }
</script>

<template>
    <button class="text-white bg-cyan-700 py-2 px-2 rounded-xl hover:bg-cyan-300" @click="increment">Count is: {{  count }}</button>
</template>