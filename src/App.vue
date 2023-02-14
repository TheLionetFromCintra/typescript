<script setup lang="ts">
import { onMounted } from 'vue'
import { useDictionaryStore } from '@/stores/common/DictionaryStore'

const dictionaryStore = useDictionaryStore()

onMounted(() => {
    document.querySelector('.preloader')?.remove()
    document.querySelector('html')?.classList.remove('hidden')
    dictionaryStore.init()
})
</script>

<template>
    <router-view></router-view>
    <base-button-up></base-button-up>
</template>
