<script setup lang="ts">
import MainHeader from '@/components/common/headers/MainHeader.vue'

const title = `Ошибка 404`

const desc = `Проверьте адресную строку, возможно вы ошиблись при вводе данных`
</script>

<template>
    <main-header
        class="main-header not-found"
        :title="title"
        :desc="desc"
        :show-auto="false"
    ></main-header>
</template>
