<script setup lang="ts">
import TheHeader from '@/components/common/headers/TheHeader.vue'
import TheFooter from '@/components/common/footer/TheFooter.vue'
import StepCalc from '../components/StepCalc.vue'

import { computed } from 'vue'

import { useDictionaryStore } from '@/stores/common/DictionaryStore'
import useMobile from '@/hooks/mobile'

const dictionaryStore = useDictionaryStore()
const { isMobile, isCpa } = useMobile()

interface Props {
    stepCurrent: number
    stepMax: number
    stepTitle: string
    mobTitle?: string
    showCacl?: boolean
}

const { stepCurrent, stepMax, stepTitle, mobTitle, showCacl } =
    defineProps<Props>()

const progressBar = computed(() => {
    return Number(10 + stepCurrent * 30)
})
</script>

<template>
    <div class="poll">
        <div class="wrapper">
            <div class="poll__header">
                <the-header></the-header>
            </div>

            <h1 class="subtitle" v-if="!isMobile">
                {{
                    dictionaryStore.dictionary.get('dictionary')
                        ?.applicationHeader
                }}
            </h1>

            <step-calc v-if="isCpa && showCacl"></step-calc>

            <div class="poll__title">
                {{ stepCurrent }} из {{ stepMax }} <span>{{ stepTitle }}</span>
            </div>

            <div class="poll__main">
                <div class="progress-bar">
                    <div class="bar" :style="`width: ${progressBar}%`"></div>
                </div>

                <h3 class="mob-title" v-if="isMobile && mobTitle">
                    {{ mobTitle }}
                </h3>
                <slot name="form"></slot>
            </div>
        </div>
    </div>

    <the-footer class="poll__footer"></the-footer>
</template>

<style scoped lang="scss">
.wrapper {
    width: 100%;
    margin: 0 auto;
    min-height: calc(100vh - 200px);
    max-width: 1034px;
    padding: 45px 40px 138px 40px;

    @media (max-width: $mobile) {
        max-width: 100%;
        padding: 0 0 128px 0;
        min-height: initial;
    }
}
.subtitle {
    text-align: left;
    margin: 24px 0 42px 0;
}

.poll {
    &__main {
        background: #fefeff;
        padding: 48px 36px;
        position: relative;

        @media (max-width: $mobile) {
            padding: 42px 36px 48px 36px;
        }
        @media (max-width: 374px) {
            padding: 42px 24px 48px 24px;
        }
    }

    &__title {
        margin-bottom: 12px;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: 0.07em;
        span {
            display: inline-block;
            padding-left: 14px;
            font-weight: inherit;
        }
        @media (max-width: $mobile) {
            padding: 0 24px;
        }
        @media (max-width: 374px) {
            font-size: 13px;
            line-height: 18px;
        }
    }

    &__footer {
        margin-top: 0;
    }
    @media (max-width: $mobile) {
        &__header {
            padding: 35px 24px 0 24px;
            margin-bottom: 36px;
        }
    }
    .progress-bar {
        position: absolute;
        top: 0;
        height: 3px;
        background: #ebebeb;
        width: 100%;
        left: 0;
        overflow: hidden;
    }
    .bar {
        height: 100%;
        background: $primary-grey-dark;
    }
}

.mob-title {
    @media (max-width: $mobile) {
        text-align: center;
        margin-bottom: 36px;

        font-weight: 600;
        font-size: 24px;
        line-height: 33px;
        color: $primary-grey-dark;
    }
}
</style>
