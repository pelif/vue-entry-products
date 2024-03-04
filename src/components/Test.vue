<script>
    export default {
        name: 'Test',
        methods: {
            clickMe() {
                alert('Thanks for click me!')
            }
        }
    }   
</script>

<template>
    <div>
        This is a test Component
        <button 
            class="text-white bg-cyan-300 hover:bg-cyan-600 py-2 px-2 rounded-md" 
            @click="clickMe">Click Me</button>
    </div>
</template>

