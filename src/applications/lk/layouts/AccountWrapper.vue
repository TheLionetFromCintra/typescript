<script setup lang="ts">
interface Props {
    title: string
}

const { title } = defineProps<Props>()
</script>

<template>
    <h1 class="subtitle subtitle--account">{{ title }}</h1>
    <slot name="desc"></slot>
    <div class="content">
        <slot name="content"></slot>
    </div>
</template>

<style scoped lang="scss">
h1 {
    text-align: left;
}
.content {
    margin-top: 48px;
    width: 100%;

    @media (max-width: $mobile) {
        margin-top: 24px;
    }
}
</style>
