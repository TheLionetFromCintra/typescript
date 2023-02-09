<script setup lang="ts">
import { onMounted } from 'vue'
import { useDictionaryStore } from '@/stores/common/DictionaryStore'

const dictionaryStore = useDictionaryStore()

onMounted(() => {
    document.querySelector('.preloader')?.remove()
    dictionaryStore.init()
})
</script>

<template>
    <router-view></router-view>
    <base-button-up></base-button-up>
</template>
