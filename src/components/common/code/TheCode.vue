<script setup lang="ts">
import Storage from '@/ext/storage/storage'

import { ref } from 'vue'

const props = defineProps({
    getCode: {
        type: Function,
        default: () => {},
    },
    notInitSend: {
        type: Boolean,
        default: false,
    },
})

const seconds = 1 * 60
const miliseconds = seconds * 1000

const timer = ref(0)

const setTimer = function (time: number) {
    if (time < 0) time = 0

    timer.value = time

    if (time === 0) return

    setTimeout(() => {
        setTimer(time - 1)
    }, 1000)
}

const initTimer = async function (flag = true, getCode = true) {
    let timer = Storage.get(`timer-login`)

    if (flag && timer && +timer < +new Date() + miliseconds) {
        setTimer(Math.ceil((+timer - +new Date()) / 1000))
    } else {
        if (getCode) {
            await props.getCode()
        }

        setTimer(seconds)
        Storage.set(`timer-login}`, String(+new Date() + miliseconds))
    }
}

initTimer(true, !props.notInitSend)
</script>

<template>
    <div class="text send d-flex" v-if="timer">
        <div
            class="img img-wrapper d-flex align-items-center justify-content-center"
        >
            <img src="/assets/images/common/clock-icon.svg" alt="clock icon" />
        </div>
        <span>Действителен {{ timer }} с</span>
    </div>
    <div class="text repeat" v-else @click="initTimer(false)">
        Выслать повторно
    </div>
</template>

<style scoped lang="scss">
.text {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #8f8f8f;
}
.repeat {
    cursor: pointer;
    padding-bottom: 2px;
    border-bottom: 1px solid #8f8f8f;
    transition: border-color 0.3s linear;

    &:hover {
        border-color: transparent;
    }
}
.send {
    cursor: wait;
}
.img {
    margin-right: 12px;
    width: 20px;
    height: 20px;
    img {
        height: auto;
        max-width: 100%;
    }
}
</style>
