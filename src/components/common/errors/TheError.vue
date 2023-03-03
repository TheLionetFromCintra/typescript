<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    desc: {
        type: String,
        default: '',
    },
    action: {
        type: String,
        default: '',
    },
})

const title = computed(() => {
    return props.title || 'Непредвиденная ошибка'
})

const desc = computed(() => {
    return (
        props.desc ||
        `При обработке запроса произошла ошибка.<br/>
                Попробуйте обновить страницу и повторить действие,
                либо обратитесь в службу поддержки.`
    )
})

const action = computed(() => {
    return props.action || 'Обновить страницу'
})

const refreshPage = function () {
    location.reload()
}

onMounted(() => {
    document.querySelector('html')?.classList.add('hidden')
})

onUnmounted(() => {
    document.querySelector('html')?.classList.remove('hidden')
})
</script>

<template>
    <teleport to="body">
        <div class="error">
            <div class="wrapper">
                <div
                    class="icon d-flex align-items-center justify-content-center"
                >
                    <span>!</span>
                </div>
                <h1 class="subtitle">{{ title }}</h1>
                <div class="desc">
                    <p v-html="desc"></p>
                </div>
                <div class="btn">
                    <base-button mode="black" @click="refreshPage">{{
                        action
                    }}</base-button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<style scoped lang="scss">
.error,
.wrapper {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.error {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 100000;
    background-color: #f3f3f3;
}
.wrapper {
    text-align: center;
    padding: 20px;
    @media (max-width: $mobile) {
        max-width: 410px;
        margin: 0 auto;
    }
}
.icon {
    margin-bottom: 44px;
    width: 80px;
    height: 80px;
    background-color: $main_brand_1;
    border-radius: 50%;
    color: #fefeff;
    span {
        display: block;
        font-size: 38px;
        font-weight: 700;
    }

    @media (max-width: $mobile) {
        width: 60px;
        height: 60px;
        margin-bottom: 24px;
        span {
            display: block;
            font-size: 28px;
            font-weight: 700;
        }
    }
}
.desc {
    margin-top: 32px;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.07em;

    @media (max-width: $mobile) {
        margin-top: 24px;
        font-size: 14px;
        line-height: 18px;
    }
}
.btn {
    margin-top: 40px;
    button {
        min-width: 231px;
    }

    @media (max-width: $mobile) {
        width: 100%;
    }
}
</style>
