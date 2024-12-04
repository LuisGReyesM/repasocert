<script>
import IconoAnimado from '@/components/icons/IconoAnimado.vue'
export default {
    name: 'FooterComponent',
    components: {
        IconoAnimado
    }
}
</script>

<template>
    <nav class="d-flex footer navbar justify-content-center align-items-center bg-dark border-bottom border-body" data-bs-theme="dark">
        <h1 class="text-center fs-4">Copyright © 2024 ToDo App</h1>
        <IconoAnimado />
    </nav>
</template>
