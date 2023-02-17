<script setup lang="ts">
import AccountWrapper from '../layouts/AccountWrapper.vue'

import { defineAsyncComponent } from 'vue'

const TheDocuments = defineAsyncComponent(
    () => import('../components/TheDocuments.vue')
)
</script>

<template>
    <account-wrapper title="Документы">
        <template #content>
            <suspense>
                <the-documents></the-documents>
                <template #fallback>loading...</template>
            </suspense>
        </template>
    </account-wrapper>
</template>

<style scoped lang="scss"></style>
