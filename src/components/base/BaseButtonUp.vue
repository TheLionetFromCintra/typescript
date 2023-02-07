<script setup lang="ts">
import { ref, onMounted } from 'vue'

const scTimer = ref(0)
const scY = ref(0)

const handleScroll = function () {
    if (scTimer.value) return
    scTimer.value = setTimeout(() => {
        scY.value = window.scrollY
        clearTimeout(scTimer.value)
        scTimer.value = 0
    }, 100)
}

const toTop = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})
</script>

<template>
    <teleport to="body">
        <div
            class="btn-up d-flex align-items-center justify-content-center"
            @click="toTop"
            :class="{ active: scY }"
        >
            <div
                class="icon img-wrapper d-flex align-items-center justify-content-center"
            >
                <img src="assets/images/common/arrow.svg" alt="arrow icon" />
            </div>
        </div>
    </teleport>
</template>

<style scoped lang="scss">
.btn-up {
    width: 48px;
    height: 48px;
    background-color: $main_brand_2;
    right: 48px;
    bottom: 48px;
    position: fixed;
    z-index: 800;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;

    transition: opacity 0.3s linear, visibility 0.3s linear;

    @media (max-width: $mobile) {
        width: 40px;
        height: 40px;
        right: 24px;
        bottom: 24px;
    }

    &.active {
        opacity: 1;
        visibility: visible;
    }
}
.icon {
    max-width: 22px;
    height: 12px;
    margin-top: -4px;
    @media (max-width: $mobile) {
        max-width: 20px;
        height: 10px;
    }
}
</style>
