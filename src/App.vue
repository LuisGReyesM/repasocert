<script setup>
import {RouterView } from 'vue-router';
import NavBarComponent from '@/components/NavBarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <header>

    <NavBarComponent />

  </header>

  <RouterView />
  <FooterComponent />

</template>

<style lang = "scss">
    @import "@/styles/_main.scss"
</style>
