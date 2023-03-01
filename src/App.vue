<script setup lang="ts">
import { onMounted } from 'vue'
import { useDictionaryStore } from '@/stores/common/DictionaryStore'
import { useAppStore } from '@/stores/app/AppStore'

const dictionaryStore = useDictionaryStore()
const appStore = useAppStore()

onMounted(async () => {
    document.querySelector('.preloader')?.remove()
    document.querySelector('html')?.classList.remove('hidden')

    await dictionaryStore.init()
    await appStore.updateData()
})
</script>

<template>
    <router-view></router-view>
    <base-button-up></base-button-up>
</template>
