<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Spinner from '@/components/Spinner.vue'
</script>

<template>
  <Spinner/>
  <NavBar/>
  <RouterView />   
</template>




