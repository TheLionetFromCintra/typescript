<script setup lang="ts">
import TheMenu from '@/components/common/menu/TheMenu.vue'
</script>

<template>
    <div class="sidebar">
        <router-link :to="{ name: 'landing' }" class="logo"> </router-link>
        <the-menu></the-menu>
    </div>
</template>

<style scoped lang="scss">
.sidebar {
    width: 100%;
    max-width: 346px;
    background-color: $sub-background;
    position: sticky;
    top: 0;
    max-height: 100vh;
    padding: 42px 52px 0 98px;
}
</style>
