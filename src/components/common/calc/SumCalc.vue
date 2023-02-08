<script setup lang="ts">
import { defineAsyncComponent, computed, reactive, ref } from 'vue'
import price from '@/helpers/string/price'
import useMobile from '@/hooks/mobile'

import { useAppStore } from '@/stores/app/AppStore'

const appStore = useAppStore()

const VueSlider = defineAsyncComponent(() => import('vue-slider-component'))

const props = defineProps({
    modelValue: {
        type: Number,
    },
    showRangeInfo: {
        type: Number,
        default: 0,
    },
})

const emit = defineEmits<{
    (e: 'update:modelValue', amount: number): void
}>()

const { isMobile } = useMobile()

const config = reactive({
    min: 1000,
    max: 100000,
    step: 1000,
})

const loanSum = ref(props.modelValue)

const minPrice = computed(() => {
    return price(config.min)
})

const setPriceRange = function (num: number) {
    return price((config.max / (props.showRangeInfo - 1)) * (num - 1) || 0)
}

const changeAmount = function (e: InputEvent) {
    emit('update:modelValue', +e)
    appStore.updateCalculator({ term: appStore.term, amount: +e })
}
</script>

<template>
    <div class="sum">
        <vue-slider
            v-model="loanSum"
            :dot-size="8"
            :min="config.min"
            :max="config.max"
            :interval="config.step"
            @change="changeAmount"
        >
        </vue-slider>
        <div
            class="range-vue-slider d-flex align-items-center justify-content-between"
            v-if="!isMobile && props.showRangeInfo"
        >
            <span v-for="item in props.showRangeInfo" :key="item">
                {{ item === 1 ? minPrice : setPriceRange(item) }} ₽
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.sum {
    @media (max-width: $mobile) {
        margin-bottom: 18px;
    }
}
</style>
