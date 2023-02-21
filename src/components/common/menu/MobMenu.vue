<script setup lang="ts">
import TheMenu from '@/components/common/menu/TheMenu.vue'
import { onUnmounted } from 'vue'

interface Props {
    isActive: boolean
    closeMenu: Function
}

const { isActive, closeMenu } = defineProps<Props>()

onUnmounted(() => {
    document.querySelector('html')?.classList.remove('hidden')
})
</script>

<template>
    <transition name="mob">
        <div class="mob-menu" v-if="isActive">
            <the-menu class="mobile" @close="closeMenu"></the-menu>
        </div>
    </transition>
</template>

<style scoped lang="scss">
.mob-menu {
    width: 100%;
    height: 100%;
    background: #fefefe;
    z-index: 1000;
    padding: 125px 40px 35px 40px;

    position: fixed;
    top: 0;
    left: 0;

    @media (max-width: $mobile) {
        padding: 105px 24px 35px 24px;
    }
}

.mob-enter-from,
.mob-leave-to {
    transform: translateY(-100%);
}
.mob-enter-active {
    transition: all 0.5s ease-out;
}
.mob-leave-active {
    transition: all 0.5s ease-in;
}
.mob-enter-to,
.mob-leave-from {
    transform: translateY(0%);
}
</style>
