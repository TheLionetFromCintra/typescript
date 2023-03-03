<script setup lang="ts">
import { onMounted } from 'vue'
import { useDictionaryStore } from '@/stores/common/DictionaryStore'
// import { useAppStore } from '@/stores/app/AppStore'

const dictionaryStore = useDictionaryStore()
// const appStore = useAppStore()

onMounted(async () => {
    document.querySelector('.preloader')?.remove()
    document.querySelector('html')?.classList.remove('hidden')

    await dictionaryStore.init()
    // console.log(appStore.showError)
    // await appStore.updateData()
})
</script>

<template>
    <router-view></router-view>
    <!-- <router-view v-slot="{ Component }">
        <template v-if="Component.name !== 'unsubscribe'">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </template>
        <template v-else>
            <component :is="Component" />
        </template>
    </router-view> -->
    <base-button-up></base-button-up>
</template>
