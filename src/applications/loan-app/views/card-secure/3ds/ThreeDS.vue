<script setup lang="ts">
import threeDS2 from '@/api/threeDS2'

import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

import { useAppStore } from '@/stores/app/AppStore'

const router = useRouter()
const appStore = useAppStore()

const errTitle = ref('')
const errDesc = ref('')
const errAction = ref('')

const close = function () {
    router.push({ name: 'LoanCard' })
}

const showError = function () {
    appStore.loadError(true)
    return
}

const init = async function () {
    let data = JSON.parse(history.state.data)
    let card = JSON.parse(history.state.card)

    if (!['3ds_2', '3ds'].includes(data.type)) {
        showError()
        return
    }

    if (data.type === '3ds_2') {
        const frame = document.createElement('iframe')
        const path =
            window.location.origin +
            '/api/tinkoff_3ds_2?ThreeDSMethodURL=' +
            data.ThreeDSMethodURL +
            '&threeDSMethodData=' +
            data.threeDSMethodData

        frame.setAttribute('src', path)
        frame.setAttribute('class', 'threeDS-page__invisible-frame')

        document.querySelector('.threeDS-page')?.appendChild(frame)

        const threeDS2Data = await (() =>
            new Promise((resolve) => {
                setTimeout(async () => {
                    const threeDS2Data = await threeDS2({
                        ...card,
                        ...data.dataBack,
                        language: navigator.language,
                        // @TODO узкое место чекнуть в caniuse
                        timezone: new Date().getTimezoneOffset(),
                        screen_width: screen.width,
                        screen_height: screen.height,
                    })
                    resolve(threeDS2Data)
                }, 2500)
            }))()

        data = {
            ...data,
            ...threeDS2Data,
        }
    }

    const frame = document.createElement('iframe')
    const frameSrc = `/api/${data.type}?action=${data.param}`

    frame.setAttribute('src', frameSrc)
    document.querySelector('.threeDS-page')?.appendChild(frame)
}

onMounted(() => {
    if (!history.state.data) {
        router.push({ path: '/' })
    } else {
        if (JSON.parse(history.state.data).type === 'authorized') {
            router.push({ name: 'LoanFinal' })
            return
        }
        if (!JSON.parse(history.state.data).type) {
            appStore.loadError(true)
            errTitle.value = 'Ошибка проверки карты'
            errDesc.value =
                'Мы не смогли проверить вашу карту.<br/> Попробуйте еще раз, или используйте другую'
            errAction.value = 'Перейти'
            return
        }
        init()
    }
})
</script>

<template>
    <base-error
        v-if="appStore.showError"
        :title="errTitle"
        :desc="errDesc"
        :action="errAction"
    ></base-error>
    <div class="main">
        <div
            @click="close"
            class="close d-flex align-items-center justify-content-center"
        ></div>
        <div class="threeDS-page"></div>
    </div>
</template>

<style scoped lang="scss">
.main {
    height: 100vh;
}
.close {
    width: 32px;
    height: 32px;
    background-color: $main_brand_1;
    margin: 10px 10px 40px auto;

    border-radius: 5px;
    cursor: pointer;
    position: relative;

    &:before,
    &:after {
        position: absolute;
        left: 15px;
        content: ' ';
        height: 20px;
        width: 2px;
        background-color: #fefefe;
    }
    &:before {
        transform: rotate(45deg);
    }
    &:after {
        transform: rotate(-45deg);
    }
}

.threeDS-page {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    height: 100vh;

    &__invisible-frame {
        width: 0;
        height: 0;
        border: 0;
        padding: 0;
        margin: 0;
        position: fixed;
        top: 0;
        left: 0;
    }
}
</style>
