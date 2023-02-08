<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import useMobile from '@/hooks/mobile'

import type { Term } from '@/types/app/app'
import type { PropType, WritableComputedRef } from 'vue'

import { useAppStore } from '@/stores/app/AppStore'

const appStore = useAppStore()

const VueSlider = defineAsyncComponent(() => import('vue-slider-component'))

const props = defineProps({
    modelValue: {
        type: Object as PropType<Term>,
    },
})

const emit = defineEmits<{
    (e: 'update:modelValue', term: Term): void
}>()

const filteredLoanDays: WritableComputedRef<number> = computed({
    get(): number {
        if (props.modelValue?.type === 'days') {
            return props.modelValue?.count
        } else {
            return 32 + +String(props.modelValue?.count).substr(-1) * 4
        }
    },
    set(v: number): void {
        if (v <= 31) {
            const term = {
                type: 'days',
                count: v,
            }
            emit('update:modelValue', term)
            appStore.updateCalculator({
                term: appStore.term,
                amount: appStore.amount,
            })
            return
        }

        let count = 0

        const week = v - 32

        if (week !== 0) {
            count = Math.floor((week / 8) * 2)
        }

        const term = {
            type: 'weeks',
            count: +('1' + count),
        }

        emit('update:modelValue', term)
        appStore.updateCalculator({
            term: appStore.term,
            amount: appStore.amount,
        })
    },
})

const { isMobile } = useMobile()
</script>

<template>
    <div class="days">
        <vue-slider
            v-model="filteredLoanDays"
            :dot-size="8"
            :min="1"
            :max="65"
            :interval="1"
        >
        </vue-slider>
        <div
            class="range-vue-slider d-flex align-items-center justify-content-between"
            v-if="!isMobile"
        >
            <span> 1 день </span>
            <span> 10 недель </span>
            <span> 18 недель </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.days {
    margin-top: 36px;

    @media (max-width: $mobile) {
        margin-top: 0;
    }
}
</style>
