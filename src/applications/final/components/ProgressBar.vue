<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

import type { Loan } from '@/types/common/loans'
import type { PropType } from 'vue'

const props = defineProps({
    initSteps: {
        type: Number,
    },
    finalSteps: {
        type: Number,
    },
    progressBar: {
        type: Number,
    },
    notClicked: {
        type: Array as PropType<Loan[]>,
    },
})

const maxOfferLink = ref('')

const stepsClass = computed(() => {
    if (!props.initSteps || !props.finalSteps) return

    return props.initSteps >= props.finalSteps ? 'active' : ''
})

const getMaxOfferLink = function (arr: Loan[]) {
    const maxLinkEl = [...arr].reduce((acc, curr) =>
        acc.chance > curr.chance ? acc : curr
    )

    maxOfferLink.value = maxLinkEl.link
}

onMounted(() => {
    document.querySelector('footer')?.classList.add('padding-bottom')
})
onUnmounted(() => {
    document.querySelector('footer')?.classList.remove('padding-bottom')
})
</script>

<template>
    <div class="popup">
        <div class="progress-bar">
            <div class="bar" :style="`width: ${progressBar}%`"></div>
        </div>
        <div class="wrapper">
            <div class="subtitle">
                Отправлено {{ initSteps }} из {{ finalSteps }} заявок
            </div>
            <p class="text">
                Получите персональное предложение с максимальной вероятностью
                одобрения
            </p>
            <div class="btn-wrapper">
                <a
                    class="btn"
                    :class="stepsClass"
                    :href="maxOfferLink"
                    target="_blank"
                    @click="
                        getMaxOfferLink(
                            props.notClicked ? props.notClicked : []
                        )
                    "
                    >Оформить займ</a
                >
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.popup {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fefeff;
    padding: 24px 36px;
    overflow: hidden;
    z-index: 997;
}

.progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: #ebebeb;
}
.bar {
    width: 10%;
    height: 100%;
    background: $main_brand_1;
}
.wrapper {
    width: 100%;
    max-width: 1202px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.subtitle {
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
    text-align: center;
}
.text {
    margin-top: 24px;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.04em;
}
.btn-wrapper {
    margin-top: 24px;
}
.btn {
    display: inline-block;
    width: 100%;
    min-width: 250px;
    max-width: 250px;
    max-height: 56px;
    background: #eaeaea;
    border-radius: 0;

    font-weight: 600;
    font-size: 16px;
    line-height: 17px;
    text-align: center;
    letter-spacing: 0.07em;
    pointer-events: none;
    padding: 14px 15px;
    transition: background 0.3s linear, color 0.3s linear;
    color: inherit;
}
.btn.active {
    background: $main_brand_2;
    color: $primary-grey-dark;
    pointer-events: unset;
    cursor: pointer;
}

@media (max-width: $mobile) {
    .popup {
        padding: 16px 20px 24px 20px;
    }
    .wrapper {
        max-width: 100%;
    }
    .subtitle {
        font-size: 16px;
        line-height: 19px;
    }
    .text {
        margin-top: 12px;
        font-size: 14px;
        line-height: 18px;
    }
    .btn-wrapper {
        margin-top: 16px;
    }
    .btn {
        min-width: 231px;
    }
}
</style>
