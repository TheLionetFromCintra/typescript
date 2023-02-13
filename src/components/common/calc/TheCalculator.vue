<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue'

import useMobile from '@/hooks/mobile'
import { useAppStore } from '@/stores/app/AppStore'

const appStore = useAppStore()

const { isMobile } = useMobile()

const DaysCalc = defineAsyncComponent(() => import('./DaysCalc.vue'))
const SumCalc = defineAsyncComponent(() => import('./SumCalc.vue'))

onMounted(() => {
    appStore.initCalculator()
})
</script>

<template>
    <div class="calc">
        <div class="wrapper">
            <div
                class="label d-flex justify-content-between align-items-center"
                v-if="!isMobile"
            >
                <span class="val">{{ appStore.loanPriceString }} ₽</span>
                на
                <span class="val"
                    >{{ appStore.calculator.term.count }}
                    {{ appStore.loanDaysString }}</span
                >
            </div>
            <div class="mob-label" v-if="isMobile">
                <span>Сумма</span>
                <span>{{ appStore.loanPriceString }} ₽</span>
            </div>
            <sum-calc
                v-model="appStore.calculator.amount"
                :show-range-info="3"
            ></sum-calc>

            <div class="mob-label" v-if="isMobile">
                <span>Срок</span>
                <span
                    >{{ appStore.calculator.term.count }}
                    {{ appStore.loanDaysString }}</span
                >
            </div>
            <days-calc v-model="appStore.calculator.term"></days-calc>

            <div class="d-flex justify-content-center btn">
                <base-button :link="true" to="primary" mode="yellow"
                    >Оформить заявку</base-button
                >
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.calc {
    width: 100%;
    max-width: 304px;
    padding-top: 55px;

    @media (max-width: $tablet) {
        padding-top: 45px;
        margin-bottom: 45px;
        max-width: 500px;
    }
}
.wrapper {
    width: 100%;

    @media (max-width: $tablet) {
        padding: 20px;
        background-color: #fefefe;
        box-shadow: 0px 232px 93px rgba(205, 207, 210, 0.01),
            0px 131px 78px rgba(205, 207, 210, 0.05),
            0px 58px 58px rgba(205, 207, 210, 0.09),
            0px 15px 30px rgba(180, 185, 204, 0.08),
            0px 0px 0px rgba(135, 135, 135, 0.42);
    }

    .label {
        margin-bottom: 64px;

        font-size: 16px;
        line-height: 22px;
        color: $primary-black;
    }

    .val {
        font-weight: 600;
        font-size: 24px;
        line-height: 33px;
    }
    .btn {
        margin-top: 52px;
        a {
            padding: 12px;
            min-width: 224px;
        }
    }
}
@media (max-width: $mobile) {
    .calc {
        padding-top: 0;
        margin: 42px 0 35px 0;
        max-width: 87%;
    }
    .wrapper {
        padding: 18px 0;

        .btn {
            margin-top: 36px;
            a {
                min-width: 210px;
            }
        }

        .mob-label {
            display: flex;
            width: 100%;
            justify-content: space-between;

            font-size: 16px;
            line-height: 22px;
            color: #181818;
            padding: 0 14px;
            margin-bottom: 8px;
        }
    }
}
</style>
